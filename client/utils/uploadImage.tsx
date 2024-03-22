import React from "react";
import AWS from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
type Props = {
  file: File;
};

const uploadImage = async (file: File) => {
  console.log(file);

  if (file) {
    console.log("AASDF");
    const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_S3_NAME;
    const REGION = process.env.NEXT_PUBLIC_AWS_SERVER_REGION;

    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params: { Bucket?: string; Key: string; Body?: File } = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    const uploadResult: AWS.S3.ManagedUpload.SendData = await s3
      .upload(params)
      .promise();

    console.log(uploadResult.Location);

    return uploadResult.Location;
  }
};

export default uploadImage;
