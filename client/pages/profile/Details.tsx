"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoCamera } from "react-icons/io5";
import Profile from "@/components/header/Profile";
type Props = {};

const Details = (props: Props) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    const selectedImages: FileList[] = [];
    console.log(selectedFiles);

    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const reader = new FileReader();

        reader.onload = () => {
          console.log(reader.result);
        };

        reader.readAsDataURL(file);
      }
    }
  };
  return (
    <div className=" w-full h-screen ">
      {/* header */}
      <div className=" w-full h-80 relative bg-slate-400">
        <div className=" absolute w-56 h-56 rounded-full bg-white border group border-black  -bottom-11 left-10">
          <label htmlFor="images">
            <IoCamera className="w-10 h-10  bottom-3 z-20 absolute right-2 text-white bg-pri rounded-full p-2 " />
          </label>
          <input
            type="file"
            accept="image/*"
            id="images"
            multiple
            className=" hidden"
            onChange={handleImageChange}
          />
          <Image
            alt="userImage"
            src={"/images/designer.png"}
            className=" group-hover:scale-110 transition-all peer-hover:invisible"
            fill
          />
        </div>
      </div>
      {/* details */}
      <div className="w-full flex "></div>
    </div>
  );
};

export default Details;
