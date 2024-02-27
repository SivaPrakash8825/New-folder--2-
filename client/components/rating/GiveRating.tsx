import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { FaStar, FaUser } from "react-icons/fa"
import { ClickButton } from "../button/Button"
import Title from "../titles/Title"
import ReviewSlider from "./ReviewSlider"
// import ReviewSlider from "./ReviewSlider"
// import axios from "axios"

const rateDetails = [
    {
        id: 1,
        desc: "Worst  😞",
    },
    {
        id: 2,
        desc: "Bad  🙁",
    },
    {
        id: 3,
        desc: "Average  😐",
    },
    {
        id: 4,
        desc: "Good  🙂",
    },
    {
        id: 5,
        desc: "Excellent  🤩",
    },
]

const GiveRating = () => {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [onHoverStar, setOnHoverStar] = useState(rating)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const navigate = useRouter()

    // const handleRate = async () => {
    //     if (userData == null) {
    //         return navigate.push(`/users/login`)
    //     }
    //     try {
    //         setIsLoading(true)
    //         setIsError(false)
    //         const rate = await axios.post(`http://localhost:3000/api/rate`, {
    //             workerId,
    //             userId: userData._id,
    //             rating,
    //             review,
    //         })
    //         setUsersRating((e) => [...e, rate.data])
    //         setIsLoading(false)
    //         setRating(0)
    //         setOnHoverStar(0)
    //         setReview("")
    //         console.log(rate)
    //     } catch (err) {
    //         setIsLoading(false)
    //         setIsError(true)
    //         console.log(err)
    //     }
    // }

    return (
        <>
            {/* Rate */}
            <section className="flex flex-col gap-y-10 bg-white dark:bg-dark w-max mx-auto p-6 rounded-xl min-w-[50%] text-center">
                {/*      desc    */}
                {onHoverStar > 0 ? (
                    <h1 className="text-pri text-center  text-3xl font-semibold my-2">
                        {rateDetails[onHoverStar - 1]?.desc}
                    </h1>
                ) : (
                    <h1 className="text-pri text-center  text-3xl font-semibold my-2">
                        How Was The Service?
                    </h1>
                )}
                {/* Star */}
                <div
                    className="flex gap-x-4 w-max mx-auto"
                    onMouseLeave={() => setOnHoverStar(rating)}
                >
                    {rateDetails.map((data) => (
                        <Star
                            key={data.id}
                            data={data}
                            setOnHoverStar={setOnHoverStar}
                            setRating={setRating}
                            onHoverStar={onHoverStar}
                        />
                    ))}
                </div>
                {/*      review    */}

                <div className="flex flex-col-reverse justify-end w-full">
                    <textarea
                        rows={1}
                        cols={1}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Review"
                        className="w-full p-2 overflow-hidden text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-pri/70 border-pri/70 placeholder-shown:bg-transparent focus:bg-pri/70 font-sm "
                    />
                    <h1 className="mb-1 text-sm transition-all peer-placeholder-shown:text-pri/80 peer-focus:text-pri text-pri peer-focus:text-sm peer-placeholder-shown:text-lg peer-focus:mb-1 peer-placeholder-shown:-mb-8 ">
                        Write Review...
                    </h1>
                </div>

                <ClickButton size={"small"} onClick={() => null}>
                    <h1>Rate</h1>
                </ClickButton>
            </section>
        </>
    )
}

interface StarProp {
    data: typeof rateDetails[0]
    onHoverStar: number
    setOnHoverStar: (data: number) => void
    setRating: (data: number) => void
}

const Star = ({ data, onHoverStar, setOnHoverStar, setRating }: StarProp) => {
    return (
        <div
            onMouseEnter={() => setOnHoverStar(data.id)}
            onClick={() => setRating(data.id)}
        >
            <FaStar
                className={`${
                    onHoverStar >= data.id
                        ? "text-pri"
                        : "text-gray-300 dark:text-gray-700"
                } transition-all text-5xl drop-shadow-2xl hover:scale-125`}
            />
        </div>
    )
}

export default GiveRating
