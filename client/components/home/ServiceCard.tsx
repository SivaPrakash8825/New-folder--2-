import { motion } from "framer-motion"
import Image, { StaticImageData } from "next/image"
import React, { ReactNode } from "react"
import { LinkButton } from "../button/Button"

interface Props {
    serviceData: {
        title: string
        img: StaticImageData
        icon: ReactNode
        desc: string
        link: string
    }
    index: number
}

const ServiceCard = ({ serviceData, index }: Props) => {
    return (
        <>
            <motion.div
                initial={{ x: index % 2 == 0 ? -400 : 400 }}
                whileInView={{ x: 0 }}
                className="m-10 md:flex items-center  justify-center group "
            >
                {/* left  portion */}
                <div className=" bg-pri p-3 rounded-lg shadow-xl  ">
                    {serviceData.icon}
                </div>
                {/*    Right Portion  */}
                <div className="  ml-0 md:-ml-16 group-hover:-ml-24 transition-all bg-white dark:bg-gray-800 shadow-xl  p-4 lg:p-8 rounded-lg flex  flex-col gap-y-4 ">
                    {/*   Details   */}
                    <div className="  md:flex items-center justify-center">
                        {/* Img */}
                        <Image
                            quality={3}
                            className=" md:w-64 w-52 -mt-52 md:mt-0 md:-ml-40  transition-all "
                            src={serviceData.img}
                            alt={serviceData.title + "_img"}
                        />{" "}
                        <div className="flex flex-col gap-y-10">
                            <h1 className="text-4xl font-semibold text-dark dark:text-light">
                                {serviceData.title}
                            </h1>
                            <p className="text-pri text-xl">
                                {serviceData.desc}
                            </p>
                            <LinkButton link={serviceData.link} size={"small"}>
                                Book Now
                            </LinkButton>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default ServiceCard
