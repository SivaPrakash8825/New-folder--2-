import React from "react"
import Title from "../titles/Title"

interface PlanType {
    type: string
    price: number
    desc: string
}

interface Props {
    plan: PlanType
}

const PlanCard = ({ plan }: Props) => {
    return (
        <div className="bg-white  flex flex-col justify-center items-center gap-y-10 group  dark:bg-gray-800 p-2 md:p-8 rounded-md shadow-md hover:-translate-y-4 transition-all border-4  border-pri hover:bg-pri dark:hover:bg-pri ">
            <h1 className="md:text-4xl text-3xl group-hover:text-light dark:group-hover:text-dark text-pri capitalize font-extrabold transition-all">
                {plan.type}
            </h1>
            {/* Price */}
            <h1 className="md:text-5xl text-4xl text-gray-800 dark:text-gray-200 font-extrabold">
                {plan.price}
            </h1>
            {/* Desc */}
            <p className="capitalize text-lg text-gray-800 dark:text-gray-200">
                {plan.desc}
            </p>
        </div>
    )
}

export default PlanCard
