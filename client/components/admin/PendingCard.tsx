import React, { ReactNode } from "react"
import {
    AiFillThunderbolt,
    AiOutlineMail,
    AiOutlinePhone,
} from "react-icons/ai"
import { FaMoneyBillAlt } from "react-icons/fa"

import PAINTER_3D from "@/public/images/painter_3d.webp"
import ELECTRICIAN_3D from "@/public/images/electrician_3d.webp"
import PACKER_3D from "@/public/images/packer_3d.webp"
import PLUMBER_3D from "@/public/images/plumber_3d.webp"
import DESIGNER_3D from "@/public/images/designer_3d.png"
import Image, { StaticImageData } from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { ClickButton, LinkButton } from "../button/Button"

const iconImages = {
    electrician: ELECTRICIAN_3D,
    painter: PAINTER_3D,
    packer: PACKER_3D,
    designer: DESIGNER_3D,
    plumber: PLUMBER_3D,
}

const PendingCard = () => {
    const service = useSearchParams().get("service")

    if (
        service === "electrician" ||
        service === "plumber" ||
        service === "packer" ||
        service === "designer" ||
        service === "painter"
    )
        return (
            <div className="flex rounded-xl shadow-xl bg-white dark:bg-gray-800 items-center  overflow-hidden group border-2 border-pri p-2 ">
                {/* Left Side */}
                {/* Img */}
                <div className="  w-32 md:w-60 md:h-60 rounded-xl bg-pri dark:bg-pri overflow-hidden ">
                    <Image
                        src={iconImages[service] as StaticImageData}
                        alt=""
                        className="w-full h-full group-hover:scale-125 transition-all "
                    />
                </div>
                {/* Right Side */}

                <div className="flex justify-start items-start flex-col gap-y-4 p-4 dark:text-light text-dark   relative">
                    {/* Name */}
                    <h1 className="text-pri text-3xl font-semibold">Hello</h1>
                    {/* Phone */}
                    <div className="flex items-center justify-center gap-x-2 ">
                        <AiOutlinePhone />
                        <p>234230090</p>
                    </div>
                    {/* Email */}
                    <div className="flex items-center justify-center gap-x-2 ">
                        <AiOutlineMail />
                        <p>sdA@asdas.com</p>
                    </div>
                    {/* Price */}
                    <div className="flex items-center justify-center gap-x-2 ">
                        <FaMoneyBillAlt />
                        <p>{"26" + " / hr"}</p>
                    </div>
                    {/*   Btn   */}
                    <div className="flex md:flex-row flex-col gap-4 ">
                        <ClickButton onClick={() => null} size="small">
                            <h1>Acccept</h1>
                        </ClickButton>
                        <ClickButton
                            variant={"secondary"}
                            onClick={() => null}
                            size="small"
                        >
                            <h1>Reject</h1>
                        </ClickButton>
                    </div>
                </div>
            </div>
        )
    else return <h1>Loading...</h1>
}

export default PendingCard
