// import { SignUp1InputProps } from "@schema/signup.schema"
import { SignUp1InputProps } from "@/schema/signup.schema";
import { motion } from "framer-motion";
import React from "react";
import { FieldErrorsImpl } from "react-hook-form/dist/types/errors";
import {
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form/dist/types/form";
import { IoChevronBack } from "react-icons/io5";
import { ClickButton } from "../button/Button";
import { DetailsInputProps } from "@/schema/details.schema";

interface SignUp3Props {
  role: RoleProps;
  errors: Partial<FieldErrorsImpl<DetailsInputProps>>;
  register: UseFormRegister<DetailsInputProps>;
  handleSubmit: UseFormHandleSubmit<DetailsInputProps>;
  handleBack: () => void;
  handleNext: () => void;
}

const SignUp3 = ({
  role,
  errors,
  register,
  handleBack,
  handleNext,
  handleSubmit,
}: SignUp3Props) => {
  return (
    <motion.div
      className="relative flex flex-col w-11/12 p-6 px-10 text-center dark:bg-gray-800 bg-white rounded-md shadow-md shadow-black md:w-7/12 lg:w-5/12 xl:w-4/12 gap-y-6"
      initial={{ x: 400 }}
      animate={{ x: 0 }}
    >
      {/* back btn */}
      <button
        onClick={handleBack}
        className="absolute p-2 shadow-md dark:bg-dark bg-light rounded-full top-6 left-4"
      >
        <IoChevronBack className="text-2xl font-bold rounded-full text-pri" />
      </button>

      <h1 className="text-xl font-semibold capitalize lg:text-3xl md:text-2xl text-pri">
        Sign Up As {role || " "}
      </h1>

      {/*         Form Div  */}
      <div className="flex flex-col mt-1 text-left gap-y-10 ">
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
        <ClickButton onClick={handleSubmit(handleNext)} width>
          <h1>Next</h1>
        </ClickButton>
      </div>
    </motion.div>
  );
};

export default SignUp3;
