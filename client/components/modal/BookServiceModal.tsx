import { ClickButton } from "@/components/button/Button"
import { BookServiceProps, bookServiceSchema } from "@/schema/book.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"

// import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import Title from "../titles/Title"

interface Prop {
    toggleOn: () => void
}

const BookServiceModal = ({ toggleOn }: Prop) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<BookServiceProps>({
        resolver: zodResolver(bookServiceSchema),
    })

    const id = useSearchParams().get("id")

    // const queryClient = useQueryClient()

    const mutateFunc = async (
        data: BookServiceProps & { servicemanid: string }
    ) => {
        return axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/book/service`,
            data
        )
    }

    const { mutate } = useMutation({
        mutationFn: mutateFunc,
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: ["announcement"] })
        },
    })

    const handleBookService = (e: BookServiceProps) => {
        if (id) {
            mutate({ ...e, servicemanid: id })
            toggleOn()
        }
    }

    return (
        <>
            {" "}
            <Title>Book A Service</Title>
            {/* Form */}
            <div className="flex flex-col mt-4 gap-y-6 ">
                {/*     Name     */}
                <div className="flex flex-col-reverse justify-end w-full ">
                    {errors.name && (
                        <p className="p-1 text-base text-red-500 capitalize ">
                            {errors.name.message as string}
                        </p>
                    )}
                    <input
                        type="text"
                        placeholder="name"
                        className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-pri/70 border-pri/70 placeholder-shown:bg-transparent focus:bg-pri/70 font-sm "
                        {...register("name")}
                    />
                    <h1 className="mb-1 text-sm transition-all text-pri peer-placeholder-shown:text-pri/80 peer-focus:text-pri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Name
                    </h1>
                </div>
                {/*     Phone    */}
                <div className="flex flex-col-reverse justify-end w-full ">
                    {errors.phoneno && (
                        <p className="p-1 overflow-auto text-base text-red-500 capitalize resize-none">
                            {errors.phoneno.message as string}
                        </p>
                    )}
                    <input
                        type={"text"}
                        placeholder="Phone"
                        className="w-full p-2 overflow-y-auto text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-pri/70 border-pri/70 placeholder-shown:bg-transparent focus:bg-pri/70 font-sm "
                        {...register("phoneno")}
                    />
                    <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-pri/80 peer-focus:text-pri text-pri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Phone
                    </h1>
                </div>
                {/* Address   
                <div className="flex flex-col-reverse justify-end w-full ">
                    {errors.address && (
                        <p className="p-1 overflow-auto text-base text-red-500 capitalize resize-none">
                            {errors.address.message as string}
                        </p>
                    )}
                    <input
                        type={"text"}
                        placeholder="Address"
                        className="w-full p-2 overflow-y-auto text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-pri/70 border-pri/70 placeholder-shown:bg-transparent focus:bg-pri/70 font-sm "
                        {...register("address")}
                    />
                    <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-pri/80 peer-focus:text-pri text-pri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Address
                    </h1>
                </div> */}
                {/*     Email    */}
                <div className="flex flex-col-reverse justify-end w-full ">
                    {errors.email && (
                        <p className="p-1 overflow-auto text-base text-red-500 capitalize resize-none">
                            {errors.email.message as string}
                        </p>
                    )}
                    <input
                        type={"text"}
                        placeholder="Email"
                        className="w-full p-2 overflow-y-auto text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-pri/70 border-pri/70 placeholder-shown:bg-transparent focus:bg-pri/70 font-sm "
                        {...register("email")}
                    />
                    <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-pri/80 peer-focus:text-pri text-pri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Email
                    </h1>
                </div>

                {/*    Add Btn  */}
                <ClickButton
                    onClick={handleSubmit(handleBookService)}
                    size={"small"}
                >
                    <h1>Book !!</h1>
                </ClickButton>
            </div>
        </>
    )
}

export default BookServiceModal
