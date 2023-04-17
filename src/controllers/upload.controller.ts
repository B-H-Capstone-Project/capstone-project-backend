import { Request, RequestHandler, Response } from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
const fs = require('fs');
//Upload Images to S3
export const uploadFile: RequestHandler = async (req: Request, res: Response) => {
  //upload budcket
  const s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_KEY!,
      secretAccessKey: process.env.AWS_SECRET_KEY!,
    },
    region: 'ca-central-1',
  });
  try {
    if (req.file) {
      const uploadFiles: Express.Multer.File = req.file;
      const fileContent = fs.readFileSync(req.file.path);
      const objectName = `${Date.now() + uploadFiles.originalname}`;
      const params = {
        Body: fileContent,
        Bucket: process.env.BUCKET_NAME,
        Key: objectName,
        ContentType: 'binary/octet-stream',
      };
      const command = new PutObjectCommand(params);
      console.log(command);
      await s3.send(command);
      const url = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
      res.status(200).json({
        url,
      });
    }
  } catch (error) {
    console.error(
      '[reservation.controller][reservationAddress][Error] ',
      typeof error === 'object' ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: 'There was an error when fetching uploading images',
    });
  }
};

