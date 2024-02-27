import Spinner from "@/components/Spinner"
import { useSearchParams } from "next/navigation"
import React from "react"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
import { BiUser } from "react-icons/bi"
import { FaMoneyBillAlt } from "react-icons/fa"
import { FaWheelchair } from "react-icons/fa"
import PAINTER_IMG from "@/public/images/painter.png"
import PLUMBER_IMG from "@/public/images/plumber.png"
import PACKER_IMG from "@/public/images/packer.png"
import DESIGNER_IMG from "@/public/images/designer.png"
import ELECTRICIAN_IMG from "@/public/images/electrician.png"
import Image from "next/image"
import { ClickButton } from "@/components/button/Button"
import GiveRating from "@/components/rating/GiveRating"
import Title from "@/components/titles/Title"
import ReviewSlider from "@/components/rating/ReviewSlider"
import Modal from "@/components/modal/Modal"
import useToggle from "@/hooks/useToggle"
import BookServiceModal from "@/components/modal/BookServiceModal"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { motion } from "framer-motion"

const imagesDetails = {
    electrician: ELECTRICIAN_IMG,

    painter: PAINTER_IMG,

    packer: PACKER_IMG,

    designer: DESIGNER_IMG,

    plumber: PLUMBER_IMG,
}

const usersRating = [
    {
        name: "sadas",
        rating: 3,
        review: "asdasdas",
    },
    {
        name: "sadas",
        rating: 3,
        review: "asdasdas",
    },
    {
        name: "sadas",
        rating: 3,
        review: "asdasdas",
    },
]

const SeriviceIdDetials = () => {
    const service = useSearchParams().get("service")
    const id = useSearchParams().get("id")

    const { data } = useQuery({
        queryKey: [service],
        queryFn: () =>
            axios.get<WorkerProps[]>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/${
                    service === "packer" ? "packers" : service
                }/getiddata/${id}`
            ),
        enabled: !!service && !!id,
    })

    console.log(data)

    const { isOn, toggleOn } = useToggle()

    if (
        service === "electrician" ||
        service === "plumber" ||
        service === "packer" ||
        service === "designer" ||
        service === "painter"
    )
        return (
            <>
                {data ? (
                    <main className="flex h-full flex-1 flex-col justify-center items-center md:p-10 p-2 md:py-20 bg-gray-200 dark:bg-gray-800 gap-y-10">
                        {/*   Details   */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            className="flex flex-col-reverse md:flex-row  gap-x-10  bg-white dark:bg-dark text-dark dark:text-light p-3 md:p-10 rounded-xl items-center shadow-lg"
                        >
                            {/* Content */}
                            <div className="flex flex-col gap-y-8">
                                {/* Name */}
                                <div className="flex items-center text-5xl gap-x-1 ">
                                    <BiUser className="p-2 bg-pri text-5xl rounded-lg text-light " />
                                    <h1 className="font-medium capitalize ">
                                        {data.data[0].name}
                                    </h1>
                                </div>
                                {/*    2x2   */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Phone */}
                                    <div className="flex items-center text-3xl gap-x-1 ">
                                        <AiOutlinePhone className="p-2 bg-pri text-5xl rounded-lg text-light " />
                                        <p>{data.data[0].phoneno}</p>
                                    </div>
                                    {/* Email */}
                                    <div className="flex items-center text-3xl gap-x-1 ">
                                        <AiOutlineMail className="p-2 bg-pri text-5xl rounded-lg text-light " />
                                        <p>{data.data[0].email}</p>
                                    </div>
                                    {/* Price */}
                                    <div className="flex items-center text-3xl gap-x-1 ">
                                        <FaMoneyBillAlt className="p-2 bg-pri text-5xl rounded-lg text-light " />
                                        <p>
                                            {data.data[0].price
                                                ? data.data[0].price + "/hr"
                                                : "-- /hr"}
                                        </p>
                                    </div>
                                    {/* Price */}
                                    <div className="flex items-center text-3xl gap-x-1 ">
                                        <FaWheelchair className="p-2 bg-pri text-5xl rounded-lg text-light " />
                                        <p>{data.data[0].experience || "--"}</p>
                                    </div>
                                </div>
                                <ClickButton size={"small"} onClick={toggleOn}>
                                    <h1>Book Now</h1>
                                </ClickButton>
                            </div>
                            {/*   Image   */}
                            <Image
                                src={imagesDetails[service!]}
                                alt={"Img_Not_Found"}
                                className=" h-full"
                            />
                        </motion.div>
                        {/*   End Details   */}

                        {/*    Ratings / Reviews  */}
                        <Title>Rate Your Experience</Title>

                        <GiveRating />
                        {/*      Users Rating    */}
                        <Title>Reviews</Title>
                        <section className="overflow-hidden max-w-[98vw]">
                            <ReviewSlider usersRating={usersRating} />
                        </section>
                    </main>
                ) : (
                    <Spinner />
                )}
                {/*   Modal   */}
                <Modal isOn={isOn} toggleOn={toggleOn}>
                    <BookServiceModal toggleOn={toggleOn} />
                </Modal>
            </>
        )
}

export default SeriviceIdDetials
