import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { errorLogger } from "../config/winstonConfig.js";
export class S3Config {
  constructor() {
    this.bucketName = process.env.BUCKET_NAME;
    this.accessKey = process.env.S3_ACCESSKEY;
    this.secretkey = process.env.S3_SECRETKEY;
    this.region = process.env.REGION;
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: this.accessKey,
        secretAccessKey: this.secretkey,
      },
      region: this.region,
    });
  }
  async uploadImage(imageDetails) {
    try {
      const imageName = crypto.randomBytes(32).toString("hex");
      const params = {
        Bucket: this.bucketName,
        Key: imageName,
        Body: imageDetails.buffer,
        ContentType: imageDetails.mimetype,
      };

      const upload = new PutObjectCommand(params);
      await this.s3.send(upload);
      return {
        Key: params.Key,
        imgField: imageDetails.fieldname,
      };
    } catch (error) {
      errorLogger.error(error);
      throw error;
    }
  }
  async getImageUrl(img) {
    try {
      const getObjectParams = {
        Bucket: this.bucketName,
        Key: img.Key,
      };

      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
      return {
        url,
        key: img.imgField,
      };
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
}
