import React, { ReactNode } from "react"
import {
    AiFillThunderbolt,
    AiOutlineMail,
    AiOutlinePhone,
} from "react-icons/ai"
import { FaMoneyBillAlt } from "react-icons/fa"
import { MdAlternateEmail } from "react-icons/md"
import { AiFillFormatPainter } from "react-icons/ai"
import { BsFillBoxSeamFill } from "react-icons/bs"
import { TfiRulerAlt2 } from "react-icons/tfi"
import { GiKitchenTap } from "react-icons/gi"
import PAINTER_3D from "@/public/images/painter_3d.webp"
import ELECTRICIAN_3D from "@/public/images/electrician_3d.webp"
import PACKER_3D from "@/public/images/packer_3d.webp"
import PLUMBER_3D from "@/public/images/plumber_3d.webp"
import DESIGNER_3D from "@/public/images/designer_3d.png"
import Image, { StaticImageData } from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { LinkButton } from "../button/Button"

const iconImages = {
    electrician: [
        <AiFillThunderbolt className="group-hover:scale-75 transition-all " />,
        ELECTRICIAN_3D,
    ],
    painter: [
        <AiFillFormatPainter className="group-hover:scale-75 transition-all " />,
        PAINTER_3D,
    ],
    packer: [
        <BsFillBoxSeamFill className="group-hover:scale-75 transition-all " />,
        PACKER_3D,
    ],
    designer: [
        <TfiRulerAlt2 className="group-hover:scale-75 transition-all " />,
        DESIGNER_3D,
    ],
    plumber: [
        <GiKitchenTap className="group-hover:scale-75 transition-all " />,
        PLUMBER_3D,
    ],
}

const ServiceDetailsCard = ({ data }: { data: WorkerProps }) => {
    const service = useSearchParams().get("service")

    if (
        service === "electrician" ||
        service === "plumber" ||
        service === "packer" ||
        service === "designer" ||
        service === "painter"
    )
        return (
            <div className="flex rounded-xl shadow-xl bg-light dark:bg-dark items-center flex-1 overflow-hidden group border-2 border-pri">
                {/* Left Side */}
                <div className="md:text-[10rem] text-[8rem] transition-all bg-pri  text-black/60 h-full  py-6 ">
                    {iconImages[service][0] as ReactNode}
                </div>
                {/* Right Side */}

                <div className="flex justify-start items-start flex-col gap-y-4 p-4 dark:text-light text-dark md:pl-16 pl-14  relative">
                    {/* Img */}
                    <div className="left-0 -translate-x-1/2 absolute w-24 md:w-28 md:h-28 rounded-full bg-dark dark:bg-light overflow-hidden border-[6px] border-white dark:border-dark  ">
                        <Image
                            src={iconImages[service][1] as StaticImageData}
                            alt=""
                            className="w-full h-full group-hover:scale-125 transition-all "
                        />
                    </div>
                    {/* Name */}
                    <h1 className="text-pri text-3xl font-semibold">
                        {data.name || "Ram"}
                    </h1>
                    {/* Phone */}
                    <div className="flex items-center justify-center gap-x-2 ">
                        <AiOutlinePhone />
                        <p>{data.phoneno || "3w34234234"}</p>
                    </div>
                    {/* Email */}
                    <div className="flex items-center justify-center gap-x-2 ">
                        <AiOutlineMail />
                        <p>{data.email || "asdasd@asdas.com"}</p>
                    </div>
                    {/* Price */}
                    <div className="flex items-center justify-center gap-x-2 ">
                        <FaMoneyBillAlt />
                        <p>{data.price || "300" + "/hr"}</p>
                    </div>
                    {/*   Btn   */}
                    <LinkButton
                        link={`services/${service}/${
                            data.id || "sfdsfsd5353534"
                        }`}
                        size="small"
                    >
                        <h1>Book Now</h1>
                    </LinkButton>
                </div>
            </div>
        )
    else return <h1>Loading...</h1>
}

export default ServiceDetailsCard
