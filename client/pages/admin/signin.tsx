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
import { IoChevronBack } from "react-icons/io5"
import { ClickButton } from "@/components/button/Button"
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
    } = useForm<SignInInputProps>({
        resolver: zodResolver(signInSchema),
    })

    type Data = SignInInputProps & {
        role: RoleProps
    }

    // const mutateFunc = async (data: Data) => {
    //     return await axios.post(
    //         `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
    //         data,
    //         {
    //             withCredentials: true,
    //         }
    //     )
    // }

    // const { setToast } = useToast(({ setToast }) => ({ setToast }))

    // const { mutate, isLoading } = useMutation({
    //     mutationFn: mutateFunc,
    //     onSuccess: () => {
    //         setToast({
    //             msg: "Successfully Logged In",
    //             variant: "success",
    //         })
    //         queryClient.invalidateQueries({ queryKey: ["users"] })
    //         router.push("/dashboard")
    //     },
    //     onError: (e: AxiosError) => {
    //         setToast({
    //             msg: setErrorMsg(e.response!),
    //             variant: "error",
    //         })
    //     },
    // })

    const handleSignIn = async (e: SignInInputProps) => {
        const data = { ...e, role }
        console.log(data)

        try {
            // mutate(data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <main className="flex flex-col items-center justify-center flex-1 h-full py-2 dark:bg-dark bg-light md:px-10 md:py-6 p-4 gap-y-10 lg:gap-y-16">
            <div className="relative flex flex-col w-11/12 p-6 px-10 text-center bg-white rounded-md shadow-md dark:bg-gray-800 shadow-black md:w-7/12 lg:w-5/12 xl:w-4/12 gap-y-6">
                <h1 className="text-xl font-semibold capitalize lg:text-3xl md:text-2xl text-pri">
                    Sign In As Admin
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
                        <h1>Sign In As Admin</h1>
                    </ClickButton>
                </div>
            </div>
        </main>
    )
}

export default signin
