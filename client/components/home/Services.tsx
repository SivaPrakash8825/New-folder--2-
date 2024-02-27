import React from "react"
import { AiFillThunderbolt } from "react-icons/ai"
import { AiFillFormatPainter } from "react-icons/ai"
import { BsFillBoxSeamFill } from "react-icons/bs"
import { TfiRulerAlt2 } from "react-icons/tfi"
import { GiKitchenTap } from "react-icons/gi"
import PAINTER_3D from "@/public/images/painter_3d.webp"
import ELECTRICIAN_3D from "@/public/images/electrician_3d.webp"
import PACKER_3D from "@/public/images/packer_3d.webp"
import PLUMBER_3D from "@/public/images/plumber_3d.webp"
import DESIGNER_3D from "@/public/images/designer_3d.png"
import Title from "../titles/Title"
import ServiceCard from "./ServiceCard"

const serviceData = [
    {
        title: "Painting Services",
        desc: "Painters At Your Door-Step At Lowest Cost!!!",
        img: PAINTER_3D,
        link: "services/painter",
        icon: (
            <AiFillFormatPainter className="text-[12rem] ml-8 md:ml-0 w-max md:text-[15rem] text-black/50 group-hover:text-black/70 transition-all p-3" />
        ),
    },
    {
        title: "Electrician Services",
        desc: "Electricians At Your Door-Step At Lowest Cost!!!",
        img: ELECTRICIAN_3D,
        link: "services/electrician",
        icon: (
            <AiFillThunderbolt className="text-[12rem] ml-8 md:ml-0 w-max md:text-[15rem] text-black/50 group-hover:text-black/70 transition-all p-3" />
        ),
    },
    {
        title: "Plumbing Services",
        desc: "Plumbers At Your Door-Step At Lowest Cost!!!",
        img: PLUMBER_3D,
        link: "services/plumber",
        icon: (
            <GiKitchenTap className="text-[12rem] ml-8 md:ml-0 w-max md:text-[15rem] text-black/50 group-hover:text-black/70 transition-all p-3" />
        ),
    },
    {
        title: "Packing & Moving Services",
        desc: "Packers At Your Door-Step At Lowest Cost!!!",
        img: PACKER_3D,
        link: "services/packer",
        icon: (
            <BsFillBoxSeamFill className="text-[12rem] ml-8 md:ml-0 w-max md:text-[15rem] text-black/50 group-hover:text-black/70 transition-all p-3" />
        ),
    },
    {
        title: "Interior Designing Services",
        desc: "Interior Designers At Your Door-Step At Lowest Cost!!!",
        img: DESIGNER_3D,
        link: "services/designer",
        icon: (
            <TfiRulerAlt2 className="text-[12rem] ml-8 md:ml-0 w-max md:text-[15rem] text-black/50 group-hover:text-black/70 transition-all p-3" />
        ),
    },
]

const Services = () => {
    return (
        <section className="flex flex-col gap-y-4 mt-20 items-center overflow-hidden ">
            <Title>Our Services</Title>
            {/*   Services   */}
            <div className="grid grid-cols-1 mx-auto md:grid-cols-2 gapx- ">
                {serviceData.map((service, i) => (
                    <ServiceCard serviceData={service} key={i} index={i} />
                ))}
            </div>
        </section>
    )
}

export default Services
