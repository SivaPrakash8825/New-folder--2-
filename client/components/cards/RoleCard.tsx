import Image, { StaticImageData } from "next/image"

interface CardRoleProps {
    role: RoleProps
    img: StaticImageData
    name: Exclude<RoleProps, "">
    setRole: (role: RoleProps) => void
    small?: boolean
}

const RoleCard = ({
    role,
    img,
    name,
    setRole,
    small = false,
}: CardRoleProps) => {
    return (
        <div
            onClick={() => setRole(name)}
            className={`flex flex-col   text-center dark:bg-gray-800 bg-white rounded-md  cursor-pointer  w-max  transition-all border-2  shadow-black shadow-md dark:shadow-xl
             ${
                 role === name
                     ? "border-pri scale-105 "
                     : " dark:border-gray-800 border-gray-200"
             } ${
                small
                    ? "p-2 gap-y-3 md:border-[3px] "
                    : "md:p-4 p-2 gap-y-6 md:border-4 "
            } `}
        >
            {/*   Img   */}
            <div
                className={`md:w-[20vw] w-[33vw] ${
                    small ? "md:w-[13vw] w-[18vw]" : ""
                } overflow-hidden rounded-md`}
            >
                <Image
                    src={img}
                    alt={name + "_img"}
                    className="w-full h-full transition-all rounded-md hover:scale-110 bg-gray-200 dark:bg-gray-600"
                />
            </div>
            {/*   Role   */}
            <h1
                className={`text-lg capitalize  ${
                    small ? "md:text-2xl" : "md:text-2xl lg:text-3xl"
                } `}
            >
                {name}
            </h1>
        </div>
    )
}

export default RoleCard
