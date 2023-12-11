import db from './config/ormconfig';

export const dbCreateConnection = async () => {
  await db
    .initialize()
    .then(() => {
      console.log('DB has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });
};
