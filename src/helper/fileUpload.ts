import AWS from 'aws-sdk';
import multer from 'multer';
import 'dotenv/config';

const AWSConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const S3 = new AWS.S3(AWSConfig);

const upload = multer({
  fileFilter(req, file, done: any) {
    console.log('Uploading file filefilter: ', file.mimetype);
    if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
      done(null, true);
    } else {
      done(null, false);
    }
  },
});

export default upload;

export const uploadToS3 = (fileData, path) => {
  const cloudFrontUrl = process.env.CLOUDFRONT_URL;
  const awsBuketBaseUrl = process.env.AWS_BUCKET_BASE_URL;
  return new Promise((resolve, reject) => {
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(fileData.mimetype)) {
      reject(new Error(`Invalid file type`));
    }
    const params = {
      Bucket: process.env.S3_BUCKET, // Replace with your S3 bucket name
      Key: path,
      Body: fileData.buffer,
      ContentType: fileData.mimetype,
    };
    S3.upload(params, (err, data) => {
      if (err) {
        console.error('Error', err);
        reject(`Error uploading file: ${err.message}`);
      } else {
        const originalUrl = data.Location;
        const replacedUrl = originalUrl.replace(awsBuketBaseUrl, cloudFrontUrl);
        data.Location = replacedUrl;
        console.log('Success', data);
        resolve(data);
      }
    });
  });
};

export const deleteFromS3 = (url) => {
  return new Promise((resolve, reject) => {
    // Parse the URL to extract the bucket name and image key or path
    const urlParts = new URL(url);
    const pathAndFilename = urlParts.pathname.substring(1); // Remove the leading '/'
    const key = pathAndFilename.substring(pathAndFilename.indexOf('/') + 1); // Exclude the first segment (bucket name)

    const params = {
      Bucket: process.env.S3_BUCKET, // Replace with your S3 bucket name
      Key: key,
    };

    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.error('Error', err);
        reject(`Error deleting file: ${err.message}`);
      } else {
        console.log('Success', data);
        resolve(data);
      }
    });
  });
};
