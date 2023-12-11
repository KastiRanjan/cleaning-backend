import { profile } from 'console';
import db from '../orm/config/ormconfig';
import { ResetToken } from '../orm/entities/token';
import { User } from '../orm/entities/user';
import { UserProfile } from '../orm/entities/user/user-profile.entities';
import { TJwtPayload } from '../types/JwtPayload';
import { createJwtToken } from '../utils/createJwtToken';

const userRepository = db.getRepository(User);
const userProfileRepository = db.getRepository(UserProfile);
const resetTokenRepository = db.getRepository(ResetToken);

export const authService = {
  login: async (req) => {
    const { email, password } = req.body;
    const user = await userRepository.findOne({ where: { email: email, userType: { systemName: 'manager' } } });

    if (!user) throw new Error('Incorrect email or password');
    if (!user?.isActive) throw new Error('The user is not active or blocked');
    if (!user.checkIfPasswordMatch(password)) throw new Error('Incorrect email or password');

    const jwtPayload: TJwtPayload = {
      id: user.id,
      name: user.username,
      email: user.email,
      created_at: user.createdAt,
    };

    const token = createJwtToken(jwtPayload);

    return token;
  },

  getUser: async (req) => {
    const { jwtPayload } = req;

    const user = await userRepository.findOne({
      where: { email: jwtPayload.email },
      select: ['id', 'email', 'username'],
      relations: ['roles'],
    });
    if (!user) throw new Error(`User with email ${jwtPayload.email} is not found`);
    const userInfo = await userProfileRepository
      .createQueryBuilder('profile')
      .where('profile.user = :user', { user: user.id })
      .getOne();

    const data = {
      ...user,
      ...userInfo,
    };
    return data;
  },

  logout: async (req) => {
    try {
      const authToken = req.authToken;
      const loggedInResetTokenQuery = await resetTokenRepository.findOne({
        where: {
          token: authToken,
        },
      });
      if (loggedInResetTokenQuery) {
        await resetTokenRepository.delete({ id: loggedInResetTokenQuery?.id });
      }
    } catch (err) {
      throw err;
    }
  },

  forgotPassword: async (req) => {
    const { email } = req.body;
    try {
      const user = await userRepository.findOne({ where: { email: email } });
      if (!user) throw new Error('Reset link sent successfully. Please check your mail');

      // Check if a reset token already exists for the user
      const existingResetToken = await resetTokenRepository.findOne({ where: { user: { id: user.id } } });
      if (existingResetToken) {
        // Verify if the token has expired
        // const isTokenValid = await verifyToken(existingResetToken.token);
        // if (isTokenValid) throw new Error('Reset password link already sent');

        // If the token is not valid, delete the existing reset token
        await resetTokenRepository.remove(existingResetToken);
      }

      const jwtPayload: TJwtPayload = {
        id: user.id,
        expiresAt: '30m',
        secret: 'resetLink',
      };

      const token = createJwtToken(jwtPayload);

      const newResetToken = await resetTokenRepository.save({
        user: user,
        token: token,
        expiresAt: '1900-01-01 00:00:00',
        type: 'forgot-password',
      });

      return newResetToken;
    } catch (err) {
      throw err;
    }
  },
};

// export const resetPassword = async (params) => {
//   const { password, token } = params;
//   const { id }: any = await decode(token);
//   // Check if a reset token already exists for the user
//   const existingResetToken = await db.getRepository(ResetToken).findOne({ where: { user: { id: id } } });

//   if (!existingResetToken || existingResetToken === null) throw new Error('Invalid token provided');

//   // Verify if the token has expired
//   const isTokenValid = await verifyToken(existingResetToken.token);
//   if (!isTokenValid) throw new Error('Reset link token expired please send resent link again');

//   const hashPassword = await generatePassword(password);
//   const updatedUser = await db
//     .getRepository(User)
//     .createQueryBuilder()
//     .update(User)
//     .set({ password: hashPassword })
//     .where('id = :id', { id })
//     .execute();

//   const userInfoQuery = await db.getRepository(User).findOne({ where: { id: id } });

//   //delete the setup password token for expiry
//   await db.getRepository(ResetToken).delete(existingResetToken.id);

//   //send email for confirmation
//   const emailTemplate = await getMailInfo();

//   //sent mail with compiled template
//   const template = await compileEmailTemplate({
//     fileName: 'resetPasswordSucess.mjml',
//     username: userInfoQuery?.username,
//     emailTemplate: emailTemplate ?? {},
//   });

//   // Send the email to the user via email
//   await sendMail(userInfoQuery.email, 'Confirmation for reset Password from cadblox,', template);

//   return updatedUser;
// };

// export const setupPassword = async (params) => {
//   const { password, token } = params;
//   const { id }: any = await decode(token);

//   // Check if a reset token already exists for the user
//   const existingResetToken = await db.getRepository(ResetToken).findOne({
//     where: {
//       user: {
//         id: id,
//       },
//       type: 'setup-password',
//     },
//   });

//   // get the user credentials

//   const userInfoQuery = await db.getRepository(User).findOne({ where: { id: id } });

//   const activeUserStatus = await db.getRepository(UserStatus).findOne({ where: { systemName: 'active' } });

//   if (!existingResetToken || existingResetToken === null) throw new Error('Invalid token provided');

//   // Verify if the token has expired
//   const isTokenValid = await verifyToken(existingResetToken.token);
//   if (!isTokenValid) throw new Error('Setup link token expired please send setup link again');

//   const hashPassword = await generatePassword(password);
//   const updatedUser = await db
//     .getRepository(User)
//     .createQueryBuilder()
//     .update(User)
//     .set({ password: hashPassword, userStatus: activeUserStatus })
//     .where('id = :id', { id })
//     .execute();

//   //delete the setup password token for expiry
//   await db.getRepository(ResetToken).delete(existingResetToken.id);

//   //send email for confirmation
//   const emailTemplate = await getMailInfo();

//   //sent mail with compiled template
//   const template = await compileEmailTemplate({
//     fileName: 'setupPasswordSucess.mjml',
//     username: userInfoQuery?.username,
//     emailTemplate: emailTemplate ?? {},
//   });

//   // Send the email to the user via email
//   await sendMail(userInfoQuery.email, 'Confirmation for Setup Password from cadblox,', template);
//   return updatedUser;
// };

// export const changePassword = async (req: Request) => {
//   const { oldPassword, password } = req.body;

//   const { id } = req.jwtPayload;

//   const user = await getUserById(id);

//   if (!user) return null;

//   if (!user.checkIfPasswordMatch(oldPassword)) {
//     throw new Error('Current Password is Incorrect');
//   }
//   if (user.checkIfPasswordMatch(password)) {
//     throw new Error('New password cannot be same as current password');
//   }

//   user.password = password;
//   user.hashPassword();
//   const res = await changeUserPassword(user);

//   //send email for confirmation
//   const emailTemplate = await getMailInfo();

//   //sent mail with compiled template
//   const template = await compileEmailTemplate({
//     fileName: 'changePasswordSucess.mjml',
//     username: user?.username,
//     emailTemplate: emailTemplate ?? {},
//   });

//   // Send the email to the user via email
//   await sendMail(user.email, 'Confirmation for changed Password from cadblox,', template);
//   return res;
// };

// // Define a function to verify a JWT token
// export const verifyToken = (token: string): Promise<boolean> => {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, 'resetLink' as string, (err, decoded) => {
//       if (err) {
//         // Token verification failed
//         resolve(false);
//       } else {
//         // Token is valid
//         resolve(true);
//       }
//     });
//   });
// };
