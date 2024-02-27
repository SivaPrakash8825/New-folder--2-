import { ClickButton } from "@/components/button/Button"
import { FieldErrorsImpl } from "react-hook-form/dist/types/errors"
import {
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormReset,
} from "react-hook-form/dist/types/form"
import { IoChevronBack } from "react-icons/io5"
import { BiReset } from "react-icons/bi"
import { SignUp2InputProps } from "@/schema/signup.schema"
import getAvatar from "@/utils/getAvatar"
import { motion } from "framer-motion"

interface SignUp2Props {
    role: RoleProps
    errors: Partial<FieldErrorsImpl<SignUp2InputProps>>
    register: UseFormRegister<SignUp2InputProps>
    handleSubmit: UseFormHandleSubmit<SignUp2InputProps>
    handleSignUp: (e: SignUp2InputProps) => void
    reset: UseFormReset<SignUp2InputProps>
    handleBack: () => void
    handleNext: () => void
}

const SignUp2 = ({
    errors,
    register,
    handleSubmit,
    handleBack,
    handleNext,
    handleSignUp,
    reset,
    role,
}: SignUp2Props) => {
    return (
        <motion.div
            className="relative flex flex-col w-11/12 p-6 px-10 text-center dark:bg-gray-800 bg-white rounded-md shadow-md shadow-black md:w-7/12 lg:w-5/12 xl:w-4/12 gap-y-6"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
        >
            {/* back btn */}
            <button
                onClick={handleBack}
                className="absolute p-2 shadow-md  dark:bg-dark bg-light rounded-full top-6 left-4"
            >
                <IoChevronBack className="text-2xl font-bold rounded-full text-pri" />
            </button>

            {/*    Profile Pic  */}
            <div className="absolute top-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 border-2 rounded-full md:w-32 md:h-32 bg-back border-pri left-1/2 ">
                <img
                    src={getAvatar(role)}
                    alt="profile_pic"
                    className="w-full h-full rounded-full"
                />
            </div>

            {/*         Form Div  */}
            <div className="flex flex-col mt-20 text-left gap-y-10">
                {/*     Name     */}
                <div className="flex flex-col-reverse justify-end w-full">
                    {errors.name && (
                        <p className="p-1 text-base text-red-500 capitalize ">
                            {errors.name.message}
                        </p>
                    )}
                    <input
                        type="text"
                        placeholder="name"
                        className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-pri/70 border-pri/70 placeholder-shown:bg-transparent focus:bg-pri/70 font-sm "
                        {...register("name")}
                    />
                    <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-pri/80 peer-focus:text-pri text-pri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Name
                    </h1>
                </div>

                {/*     Phone     */}
                <div className="flex flex-col-reverse justify-end w-full">
                    {errors.phoneno && (
                        <p className="p-1 text-base text-red-500 capitalize ">
                            {errors.phoneno.message}
                        </p>
                    )}
                    <input
                        type="tel"
                        placeholder="name"
                        className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-pri/70 border-pri/70 placeholder-shown:bg-transparent focus:bg-pri/70 font-sm "
                        {...register("phoneno")}
                    />
                    <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-pri/80 peer-focus:text-pri text-pri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Phone No.
                    </h1>
                </div>

                {/*     City     */}
                <div className="flex flex-col-reverse justify-end w-full">
                    {errors.city && (
                        <p className="p-1 text-base text-red-500 capitalize ">
                            {errors.city.message}
                        </p>
                    )}
                    <input
                        type="tel"
                        placeholder="name"
                        className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-pri/70 border-pri/70 placeholder-shown:bg-transparent focus:bg-pri/70 font-sm "
                        {...register("city")}
                    />
                    <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-pri/80 peer-focus:text-pri text-pri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        City
                    </h1>
                </div>

                {/*      btn    */}
                <ClickButton
                    onClick={
                        role === "user"
                            ? handleSubmit(handleSignUp)
                            : handleSubmit(handleNext)
                    }
                    width
                >
                    <h1>{role === "user" ? "Sign Up" : "Next"}</h1>
                </ClickButton>
            </div>
        </motion.div>
    )
}

export default SignUp2
