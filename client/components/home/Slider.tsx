import React, { useState, useEffect } from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { LinkButton } from "@/components/button/Button"
import PAINTER_IMG from "@/public/images/painter.png"
import PLUMBER_IMG from "@/public/images/plumber.png"
import PACKER_IMG from "@/public/images/packer.png"
import DESIGNER_IMG from "@/public/images/designer.png"
import ELECTRICIAN_IMG from "@/public/images/electrician.png"
import Image from "next/image"

const bannerData = [
    {
        title: "Painting Services",
        desc: "Painters At Your Door-Step At Lowest Cost!!!",
        img: PAINTER_IMG,
        link: "services/painter",
    },
    {
        title: "Electrician Services",
        desc: "Electricians At Your Door-Step At Lowest Cost!!!",
        img: ELECTRICIAN_IMG,
        link: "services/electrician",
    },
    {
        title: "Plumbing Services",
        desc: "Plumbers At Your Door-Step At Lowest Cost!!!",
        img: PLUMBER_IMG,
        link: "services/plumber",
    },
    {
        title: "Packing & Moving Services",
        desc: "Packers At Your Door-Step At Lowest Cost!!!",
        img: PACKER_IMG,
        link: "services/packer",
    },
    {
        title: "Interior Designing Services",
        desc: "Interior Designers At Your Door-Step At Lowest Cost!!!",
        img: DESIGNER_IMG,
        link: "services/designer",
    },
]

const HomeHero = () => {
    const [slideIndex, setSlideIndex] = useState(0)

    const handleNext = () => {
        setSlideIndex((pre) => {
            if (pre >= bannerData.length - 1) return 0
            return pre + 1
        })
    }

    const handlePrevious = () => {
        if (slideIndex <= 0) return setSlideIndex(bannerData.length - 1)
        return setSlideIndex((e) => e - 1)
    }

    useEffect(() => {
        const autoSlider = setInterval(() => {
            handleNext()
        }, 5000)
        return () => clearInterval(autoSlider)
    }, [])

    return (
        <section className="w-full h-full relative bg-gray-200 dark:bg-gray-800">
            <section className="w-full flex overflow-hidden ">
                <div
                    className="flex py-10 px-[10vw] gap-x-[10vw] w-max  transition-all duration-700"
                    style={{ transform: `translateX(${-slideIndex * 90}vw)` }}
                >
                    {bannerData.map((data, i) => (
                        <div
                            key={i}
                            className="w-[80vw] rounded-3xl min-h-[30rem] mx-auto gap-x-6 dark:text-light text-dark bg-gray-100 dark:bg-gray-900  md:flex justify-center items-center shadow-lg shadow-black/80  "
                        >
                            <div>
                                <Image
                                    key={i}
                                    src={data.img}
                                    className="w-full h-full lg:object-fill object-center object-cover   "
                                    alt={data.title + "_img"}
                                />
                            </div>

                            <div className="flex flex-col gap-y-8 p-4" key={i}>
                                {/* Titile */}
                                <h1 className=" text-2xl md:text-5xl font-semibold  ">
                                    {data.title}
                                </h1>
                                {/*     Desc */}
                                <h1 className=" text-xl md:text-2xl">
                                    {data.desc}
                                </h1>
                                <LinkButton link={data.link} size={"small"}>
                                    Book Now
                                </LinkButton>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* left */}
            <button
                className="z-50 absolute top-1/2  -translate-y-1/2 md:left-10 left-4"
                onClick={() => handlePrevious()}
            >
                <FaAngleLeft className="w-12 text-white h-12 rounded-full bg-black/20 p-2 z-50 px-2" />
            </button>
            {/* right */}
            <button
                className="z-50 absolute top-1/2 -translate-y-1/2 md:right-10 right-4"
                onClick={() => handleNext()}
            >
                <FaAngleRight className="w-12 text-white h-12 rounded-full bg-black/20 p-2 z-50 px-2" />
            </button>
        </section>
    )
}

export default HomeHero
