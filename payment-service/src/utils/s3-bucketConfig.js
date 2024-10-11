import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
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
    const imageName = crypto.randomBytes(32).toString("hex");
    console.log("imgName", imageDetails);
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
  }
  async getImageUrl(img) {
    try {
      // console.log('process env',process.env);
      console.log("process.envsssssssssssssss",this.bucketName);
      console.log("process.envsssssssssssssss",this.accessKey);
      console.log("process.envsssssssssssssss",this.secretkey);
      console.log("process.envsssssssssssssss",this.region);
      console.log("image get in url", img);
      const getObjectParams = {
        Bucket: this.bucketName,
        Key: img.Key,
      };
      
      console.log("getObjectParamas", getObjectParams);
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
      return {
        url,
        key: img.imgField,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
