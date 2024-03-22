import { DetailsInputProps, detailsSchema } from "@/schema/details.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { ClickButton } from "../button/Button";
import useUser from "@/store/useUser";
import uploadImage from "@/utils/uploadImage";
import axios from "axios";
import useToast from "@/store/useToast";
import { useMutation } from "@tanstack/react-query";

const ProfileCard = ({ file }: { file: File }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<DetailsInputProps>({
    resolver: zodResolver(detailsSchema),
  });
  const { user } = useUser();
  const mutateFunc = async (data: any) => {
    return await axios.patch(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users/updateprofile`,
      {
        data: data,
      }
    );
  };

  const { setToast } = useToast(({ setToast }) => ({ setToast }));

  const { mutate } = useMutation({
    mutationFn: mutateFunc,
    onSuccess: (resp) => {
      console.log(resp.data);
      setToast({
        msg: "profile updated",
        variant: "success",
      });
    },
    onError: (e: any) => {
      console.log(e);
      setToast({
        msg: e.response.data.msg,
        variant: "error",
      });
    },
  });

  const uploadImageFun = async (data: DetailsInputProps) => {
    if (file) {
      const url = await uploadImage(file);
      if (url) {
        console.log("called");

        mutate({ data, image: url });
      }
    }
  };

  const handleSave = (e: DetailsInputProps) => {
    const data = { ...e, userId: user?.id, role: user?.role };
    uploadImageFun(data);
  };

  const Details = [
    {
      head: "name",
      value: "sivaprakash",
    },
    {
      head: "email",
      value: "21uad052@kamarajengg.edu.in",
    },
    { head: "contact", value: "sivaprakash" },
  ];

  return (
    <div className=" w-full  flex-1 flex shrink-0   justify-center items-center ">
      <div className=" w-1/2 rounded-2xl h-auto bg-white flex flex-col gap-y-3 px-10 shadow-bshad font-disp py-10 items-center">
        <div className="w-full flex">
          {" "}
          <div className="w-[40%] flex flex-col gap-y-3">
            {user &&
              Object.keys(user).map((key: string) => {
                if (
                  key === "name" ||
                  key === "city" ||
                  key === "email" ||
                  key === "phoneno"
                ) {
                  return (
                    <div key={key}>
                      <h1 className="font-black uppercase text-pri">
                        {key} :{" "}
                      </h1>
                      <p>{user[key]}</p>
                    </div>
                  );
                } else {
                  return null; // If the key doesn't match, return null or omit this block
                }
              })}
          </div>
          <div className=" flex-1">
            <div className="flex flex-col mt-1 text-left gap-y-7 ">
              {/*     Price     */}
              <div className="flex flex-col-reverse justify-end w-full">
                {errors.price && (
                  <p className="p-1 text-base text-red-500 capitalize ">
                    {errors.price.message}
                  </p>
                )}
                <input
                  type="number"
                  placeholder="price"
                  className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-pri/70 border-pri/70 placeholder-shown:bg-transparent focus:bg-pri/70 font-sm "
                  {...register("price", { valueAsNumber: true })}
                />
                <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-pri/80 peer-focus:text-pri text-pri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                  Price Per Hour
                </h1>
              </div>

              {/*     Dob     */}
              <div className="flex flex-col-reverse justify-end w-full">
                {errors.dob && (
                  <p className="p-1 text-base text-red-500 capitalize ">
                    {errors.dob.message}
                  </p>
                )}
                <input
                  type="date"
                  placeholder="dob"
                  className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-pri/70 border-pri/70 placeholder-shown:bg-transparent focus:bg-pri/70 font-sm "
                  {...register("dob")}
                />
                <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-pri/80 peer-focus:text-pri text-pri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                  DOB
                </h1>
              </div>
              {/*     Exp     */}
              <div className="flex flex-col-reverse justify-end w-full">
                {errors.experience && (
                  <p className="p-1 text-base text-red-500 capitalize ">
                    {errors.experience.message}
                  </p>
                )}
                <input
                  type="text"
                  placeholder="experience"
                  className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-pri/70 border-pri/70 placeholder-shown:bg-transparent focus:bg-pri/70 font-sm "
                  {...register("experience", { valueAsNumber: true })}
                />
                <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-pri/80 peer-focus:text-pri text-pri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                  Experience
                </h1>
              </div>

              {/*      btn    */}
            </div>
          </div>
        </div>
        <ClickButton onClick={handleSubmit(handleSave)} width>
          <h1>save</h1>
        </ClickButton>
      </div>
    </div>
  );
};

export default ProfileCard;
