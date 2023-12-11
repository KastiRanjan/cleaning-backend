import { uploadToS3 } from './fileUpload';

export const validateImageUploadUpdate = async ({ oldImgUrl, newImgUploadFile, uploadPath }) => {
  //   This function checks if the upload is new compared to the old ones and return
  //   false if its the same whereas updates the upload by deleting the old ones
  //   and updating with the new one in the s3 bucket and returns the stored img url

  const newFileName = newImgUploadFile?.originalname;

  // extracts file name from the img url
  const fileName = oldImgUrl?.substring(oldImgUrl?.lastIndexOf('/') + 1);

  if (fileName === newFileName) return false;

  // await deleteFromS3(oldImgUrl);

  const uniqueFilename = `${new Date().getTime()}_${newImgUploadFile.originalname}`;

  //upload image to s3
  const uploadedFile: any = await uploadToS3(newImgUploadFile, `${uploadPath}/${uniqueFilename}`);

  return uploadedFile.Location ?? '';
};
