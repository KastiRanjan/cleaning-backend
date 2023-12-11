import 'dotenv/config';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT ?? '2525', 10),
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  secure: true,
});

export default async function sendMail(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  to: any,
  subject: string,
  htmlContent: string,
): Promise<boolean> {
  try {
    // Send the email
    transport.sendMail(
      {
        from: 'smtp.amnilmail@gmail.com', // Sender email address
        to: to, // Recipient email address
        subject: subject, // Email subject
        html: htmlContent,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error, info: { response: any }) => {
        if (error) {
          console.log({
            module: 'mail',
            message: 'Error in sending mail',
            systemMessage: error,
          });
          // errorLogger.error(`mail error ${error}`);
        } else {
          console.log('Email sent:', info.response);
        }
      },
    );
    return true;
  } catch (error) {
    console.log({
      module: 'mail',
      message: 'Error in sending mail',
      systemMessage: error.message,
    });
    // logger.error(`mail error ${error.message}`);
    return true;
  }
}
