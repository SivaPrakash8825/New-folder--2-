import SignIn from "@/components/signin/SignIn"
// import Toast from "@components/Toast/Toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInInputProps, signInSchema } from "@/schema/signin.schema"
// import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import SelectRole from "@/components/roleSelection/SelectRole"
import SelectWork from "@/components/roleSelection/SelectWork"
import useToast from "@/store/useToast"
import { useMutation } from "@tanstack/react-query"
import { ClickButton } from "@/components/button/Button"
import { motion } from "framer-motion"
import { DetailsInputProps, detailsSchema } from "@/schema/details.schema"
import useUser from "@/store/useUser"
// import useToast from "@store/useToast"
// import setErrorMsg from "@utils/setErrorMsg"

const signin = () => {
    const [role, setRole] = useState<RoleProps>("")
    const [step, setStep] = useState(0)
    const router = useRouter()

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<DetailsInputProps>({
        resolver: zodResolver(detailsSchema),
    })

    const handleBack = () => {
        setStep((e) => e - 1)
    }

    const handleNext = () => {
        setStep((e) => e + 1)
    }

    const mutateFunc = async (data: any) => {
        return await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/${
                user?.role === "packer" ? "packers" : user?.role
            }/${user?.role + "data"}/`,
            data,
            {
                withCredentials: true,
            }
        )
    }

    const { setToast } = useToast(({ setToast }) => ({ setToast }))
    const user = useUser((state) => state.user)

    const { mutate, isLoading } = useMutation({
        mutationFn: mutateFunc,
        onSuccess: (resp) => {
            console.log(resp)
        },
        onError: (e: any) => {},
    })

    const handleDetails = async (e: DetailsInputProps) => {
        if (user) {
            const data = { ...e, user_id: user.id }
            console.log(data)

            try {
                mutate(data)
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <main className="flex flex-col items-center justify-center flex-1 h-full py-2 dark:bg-dark bg-light md:px-10 md:py-6 p-4 gap-y-10 lg:gap-y-16">
            <motion.div
                initial={{ x: 400 }}
                animate={{ x: 0 }}
                className="relative flex flex-col w-11/12 p-6 px-10 text-center bg-white rounded-md shadow-md dark:bg-gray-800 shadow-black md:w-7/12 lg:w-5/12 xl:w-4/12 gap-y-6"
            >
                <h1 className="text-xl font-semibold capitalize lg:text-3xl md:text-2xl text-pri">
                    Update Details
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
                    <ClickButton onClick={handleSubmit(handleDetails)} width>
                        <h1>Update Detials</h1>
                    </ClickButton>
                </div>
            </motion.div>
        </main>
    )
}

export default signin
