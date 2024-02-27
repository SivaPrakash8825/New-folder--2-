import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    SignUp1InputProps,
    SignUp2InputProps,
    signUp1Schema,
    signUp2Schema,
} from "@/schema/signup.schema"

import axios from "axios"
import SelectRole from "@/components/roleSelection/SelectRole"
import SignUp1 from "@/components/signup/Signup.1"
import SelectWork from "@/components/roleSelection/SelectWork"
import SignUp2 from "@/components/signup/Signup.2"
import { Plans } from "@/components/plans/Plans"
import { AnimatePresence, motion } from "framer-motion"

import { useMutation } from "@tanstack/react-query"
import useToast from "@/store/useToast"
import { Router } from "next/router"
import { useRouter } from "next/navigation"

const signUp = () => {
    const [role, setRole] = useState<RoleProps>("")
    const [step, setStep] = useState(0)

    const setToast = useToast((state) => state.setToast)
    const router = useRouter()
    const mutateFunc = async (data: Data) => {
        // const filteredData = omit(data, ["confirmPassword"])

        return await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/auth/register`,
            data
        )
    }

    const { mutate, isLoading } = useMutation({
        mutationFn: mutateFunc,
        onSuccess: (res) => {
            setToast({
                msg: res.data.msg,
                variant: "success",
            })

            router.push("/signin")
        },

        onError: (e: any) => {
            return setToast({
                msg: e.response.data.msg,
                variant: "error",
            })
        },
    })

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm<SignUp1InputProps>({
        resolver: zodResolver(signUp1Schema),
    })

    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
        reset,
    } = useForm<SignUp2InputProps>({
        resolver: zodResolver(signUp2Schema),
    })

    const handleBack = () => {
        setStep((e) => e - 1)
    }

    const handleNext = () => {
        setStep((e) => e + 1)
    }

    type Data = SignUp1InputProps &
        SignUp2InputProps & {
            role: typeof role
        }

    const handleSignUp = async (e: SignUp2InputProps) => {
        const data = { ...e, ...getValues(), role }

        console.log(data)

        try {
            mutate(data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <main className="flex flex-col items-center justify-center flex-1 h-full py-2 dark:bg-dark bg-light md:px-10 md:py-6 p-4 gap-y-10 lg:gap-y-16">
            {/*           Step - 0       */}
            {step == 0 && (
                <SelectRole
                    role={role}
                    setRole={setRole}
                    handleNext={() => {
                        if (role === "user") return setStep((e) => e + 2)
                        return handleNext()
                    }}
                    page={"signup"}
                />
            )}
            {/*         End Step - 0         */}
            {/*      Step - 1    */}
            {step == 1 && (
                <SelectWork
                    handleBack={handleBack}
                    role={role}
                    handleNext={handleNext}
                    page={"signup"}
                    setRole={setRole}
                />
            )}
            {/*      End Step - 1    */}

            {/*      Step - 2   */}
            {step == 2 && (
                <SignUp1
                    role={role}
                    handleNext={handleNext}
                    handleBack={role === "user" ? () => setStep(0) : handleBack}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    register={register}
                />
            )}
            {/*      End Step - 2   */}

            {/*      Step - 3   */}
            {step == 3 && (
                <SignUp2
                    role={role}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    handleSubmit={handleSubmit2}
                    errors={errors2}
                    register={register2}
                    reset={reset}
                    handleSignUp={handleSignUp}
                />
            )}
            {/*      End Step - 3   */}
            {/*      Step - 4  -- Worker - Payment    */}
            {step == 4 && (
                <Plans
                    first
                    handleSubmit={handleSubmit2}
                    handleSignUp={handleSignUp}
                />
            )}
        </main>
    )
}

export default signUp
