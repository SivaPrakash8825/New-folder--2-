import { ClickButton } from "@/components/button/Button";
import { SignInInputProps } from "@/schema/signin.schema";
import { motion } from "framer-motion";
import React from "react";
import { FieldErrorsImpl } from "react-hook-form/dist/types/errors";
import {
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form/dist/types/form";
import { IoChevronBack } from "react-icons/io5";

interface SignInProps {
  role: RoleProps;
  errors: Partial<FieldErrorsImpl<SignInInputProps>>;
  register: UseFormRegister<SignInInputProps>;
  handleSubmit: UseFormHandleSubmit<SignInInputProps>;
  handleBack: () => void;
  handleSignIn: (e: SignInInputProps) => void;
}

const SignIn = ({
  role,
  errors,
  register,
  handleBack,
  handleSignIn,
  handleSubmit,
}: SignInProps) => {
  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      className="relative flex flex-col w-11/12 p-6 px-10 text-center bg-white rounded-md shadow-md dark:bg-gray-800 shadow-black md:w-7/12 lg:w-5/12 xl:w-4/12 gap-y-6">
      {/* back btn */}
      <button
        onClick={handleBack}
        className="absolute p-2 shadow-md bg-gray-100 rounded-full dark:bg-gray-900 top-6 left-4">
        <IoChevronBack className="text-2xl font-bold rounded-full text-pri" />
      </button>

      <h1 className="text-xl font-semibold capitalize lg:text-3xl md:text-2xl text-pri">
        Sign In As {role || " "}
      </h1>

      {/*         Form Div  */}
      <div className="flex flex-col mt-1 text-left gap-y-10 ">
        {/*     Email     */}
        <div className="flex flex-col-reverse justify-end w-full">
          {errors.email && (
            <p className="p-1 text-base text-red-500 capitalize ">
              {errors.email.message}
            </p>
          )}
          <input
            type="email"
            placeholder="email"
            className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-pri/70 border-pri/70 placeholder-shown:bg-transparent focus:bg-pri/70 font-sm "
            {...register("email")}
          />
          <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-pri/80 peer-focus:text-pri text-pri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
            Email
          </h1>
        </div>

        {/*     Password     */}
        <div className="flex flex-col-reverse justify-end w-full">
          {errors.password && (
            <p className="p-1 text-base text-red-500 capitalize ">
              {errors.password.message}
            </p>
          )}
          <input
            type="password"
            placeholder="password"
            className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-pri/70 border-pri/70 placeholder-shown:bg-transparent focus:bg-pri/70 font-sm "
            {...register("password")}
          />
          <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-pri/80 peer-focus:text-pri text-pri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
            Password
          </h1>
        </div>

        {/*      btn    */}
        <ClickButton onClick={handleSubmit(handleSignIn)} width>
          <h1>Sign In</h1>
        </ClickButton>
      </div>
    </motion.div>
  );
};

export default SignIn;
