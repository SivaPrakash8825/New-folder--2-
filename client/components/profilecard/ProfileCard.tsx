import React from "react";

type Props = {};

const ProfileCard = (props: Props) => {
  return (
    <div className=" w-full  flex-1 flex shrink-0 bg-slate-500  justify-center items-center ">
      <div className=" w-3/4 rounded-2xl h-3/4 bg-white flex px-6 py-10 items-center">
        <div className=" w-[40%]">details</div>
      </div>
    </div>
  );
};

export default ProfileCard;
