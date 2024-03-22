"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoCamera } from "react-icons/io5";
import AWS from "aws-sdk";
import Profile from "@/components/header/Profile";
import { PutObjectOutput } from "aws-sdk/clients/s3";
import { PromiseResult } from "aws-sdk/lib/request";
import ProfileCard from "@/components/profilecard/ProfileCard";
import background from "@/public/images/background.jpg";
import uploadImage from "@/utils/uploadImage";
type Props = {};

const Details = (props: Props) => {
  const [image, setImage] = useState<string>("/images/user.png");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Uploaded file
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
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
      <div className=" w-full h-64 relative bg-pri">
        <div className="absolute w-56 h-56  z-20  -bottom-11  left-10">
          <div className=" w-full h-full relative rounded-full overflow-hidden bg-white z-10  border group border-black">
            <input
              type="file"
              accept="image/*"
              id="images"
              className=" hidden"
              onChange={handleFileChange}
            />
            <Image
              alt="userImage"
              src={image}
              className=" w-auto h-auto group-hover:scale-110 transition-all peer-hover:invisible"
              fill
            />
          </div>
          <label htmlFor="images">
            <IoCamera className="w-10 h-10  bottom-3 z-20 absolute right-2 text-white bg-pri rounded-full p-2 " />
          </label>
        </div>
      </div>
      {/* card */}

      <ProfileCard file={file} />
    </div>
  );
};

export default Details;
