import React, { useState } from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { FaStar, FaUser } from "react-icons/fa"

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

interface UserReviewProps {
    usersRating: {
        name: string
        rating: number
        review: string
    }[]
}

const ReviewSlider = ({ usersRating }: UserReviewProps) => {
    const [slideIndex, setSlideIndex] = useState(0)

    const handleNext = () => {
        if (slideIndex >= usersRating.length - 1) return setSlideIndex(0)
        return setSlideIndex((e) => e + 1)
    }

    const handlePrevious = () => {
        if (slideIndex <= 0) return setSlideIndex(usersRating.length - 1)
        return setSlideIndex((e) => e - 1)
    }

    return (
        <section className="w-full h-full relative p-6 px-2 md:px-20">
            <section className="w-full flex overflow-hidden ">
                <div
                    className="flex w-max gap-x-10 transition-all  duration-700"
                    style={{
                        transform: `translateX(calc(${-slideIndex * 50}vw +  ${
                            2.5 * -slideIndex
                        }rem ))`,
                    }}
                >
                    {usersRating.map((data, i) => (
                        <div
                            className={`md:p-8 p-2 dark:bg-dark bg-white  text-pri shadow-lg  w-[50vw] h-max translate-x-[40%] transition-all text-center rounded-lg ${
                                slideIndex == i
                                    ? "scale-100"
                                    : "scale-[.80] opacity-40"
                            }`}
                            key={i}
                        >
                            <div className="flex items-center text-xl md:text-2xl gap-x-4 text-dark dark:text-light">
                                <FaUser />
                                <h1 className="capitalize font-semibold text-dark dark:text-light">
                                    {data.name}
                                </h1>
                            </div>
                            <div className="flex items-center text-xl md:text-2xl font-semibold text-center w-max mx-auto gap-x-2 my-2 md:gap-x-4">
                                <div className="flex items-center gap-x-4">
                                    <FaStar className="text-pri " />
                                    <h1>{data.rating}</h1>
                                </div>
                                <h1>{rateDetails[data.rating - 1].desc}</h1>
                            </div>
                            <h1 className="text-clip mt-6 text-lg md:text-xl italic text-dark dark:text-light ">
                                {data.review}
                            </h1>
                        </div>
                    ))}
                </div>
            </section>
            {usersRating.length > 1 && (
                <>
                    {/* left */}
                    <button
                        className="z-50 absolute top-1/2  -translate-y-1/2 md:left-10 left-4  outline-none"
                        onClick={() => handlePrevious()}
                    >
                        <FaAngleLeft className="w-12 text-white h-12 rounded-full bg-black/20 hover:bg-black/60 transition-all  p-2 z-50 px-2  " />
                    </button>
                    {/* right */}
                    <button
                        className="z-50 absolute top-1/2 -translate-y-1/2 md:right-10 right-4 outline-none"
                        onClick={() => handleNext()}
                    >
                        <FaAngleRight className="w-12 text-white h-12 rounded-full bg-black/20 hover:bg-black/60 transition-all p-2 z-50 px-2  " />
                    </button>
                </>
            )}
        </section>
    )
}

export default ReviewSlider
