"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoCamera } from "react-icons/io5";
import AWS from "aws-sdk";
import Profile from "@/components/header/Profile";
import { PutObjectOutput } from "aws-sdk/clients/s3";
import { PromiseResult } from "aws-sdk/lib/request";
import ProfileCard from "@/components/profilecard/ProfileCard";
type Props = {};

const Details = (props: Props) => {
  const [image, setImage] = useState<string>("/images/user.png");
  const [file, setFile] = useState<File | null>(null);
  const uploadFile = async () => {
    if (file) {
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

      var upload = s3
        .putObject(params)
        .on("httpUploadProgress", (evt: AWS.S3.ManagedUpload.Progress) => {
          console.log(
            "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
          );
        })
        .promise();

      await upload
        .then((data: PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>) => {
          alert("File uploaded successfully.");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Uploaded file
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string); // Set the selected image to the FileReader result (base64 encoded URL)
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    const selectedImages: FileList[] = [];
    console.log(selectedFiles);

    if (selectedFiles) {
    }
  };
  return (
    <div className=" w-full h-screen flex flex-col ">
      {/* header */}
      <div className=" w-full h-64 relative bg-slate-400">
        <div className="absolute w-56 h-56  z-20  -bottom-11  left-10">
          <div className=" w-full h-full relative rounded-full overflow-hidden bg-white z-10  border group border-black">
            <input
              type="file"
              accept="image/*"
              id="images"
              multiple
              className=" hidden"
              onChange={handleFileChange}
            />
            <Image
              alt="userImage"
              src={image}
              className=" group-hover:scale-110 transition-all  peer-hover:invisible"
              fill
            />
          </div>
          <label htmlFor="images">
            <IoCamera className="w-10 h-10  bottom-3 z-20 absolute right-2 text-white bg-pri rounded-full p-2 " />
          </label>
        </div>
      </div>
      {/* card */}

      <ProfileCard />
      {/* details */}
      <div className="w-full flex ">
        <button onClick={uploadFile}> upload</button>
      </div>
    </div>
  );
};

export default Details;
