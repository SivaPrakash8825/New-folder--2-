import React, { Children } from "react"

interface Props {
    children: string
    underline?: boolean
}

const Title = ({ children, underline = false }: Props) => {
    return (
        <h1
            className={`font-bold text-3xl md:text-4xl lg:text-5xl text-pri capitalize ${
                underline ? "underline underline-offset-8 decoration-pri  " : ""
            } `}
        >
            {children}
        </h1>
    )
}

export default Title
