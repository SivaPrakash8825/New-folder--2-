import React from "react"
import PAINTER_IMG from "@/public/images/painter.png"
import PLUMBER_IMG from "@/public/images/plumber.png"
import PACKER_IMG from "@/public/images/packer.png"
import DESIGNER_IMG from "@/public/images/designer.png"
import ELECTRICIAN_IMG from "@/public/images/electrician.png"
import RoleCard from "../cards/RoleCard"
import Title from "../titles/Title"
import { ClickButton } from "../button/Button"
import { IoChevronBack } from "react-icons/io5"
import { motion } from "framer-motion"

interface SelectWorkProps {
    role: RoleProps
    setRole: (role: RoleProps) => void
    handleNext: () => void
    handleBack: () => void

    page: "signin" | "signup"
}

const works = ["painter", "plumber", "designer", "packer", "electrician"]

const SelectWork = ({
    role,
    setRole,
    handleNext,
    page,
    handleBack,
}: SelectWorkProps) => {
    return (
        <motion.div
            className="flex flex-col gap-y-10 items-center"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
        >
            <div className="flex justify-between md:w-6/12 w-11/12 items-center">
                {/* back btn */}
                <button
                    onClick={handleBack}
                    className=" shadow-md  p-2 dark:bg-dark bg-white rounded-full self-start self "
                >
                    <IoChevronBack className="text-2xl font-bold rounded-full text-pri" />
                </button>
                {/*    Choice Headign  */}
                <Title>{`${
                    page === "signin" ? "SignIn As" : "SignUp As"
                }`}</Title>
                {/*    Empty div --  */}
                <div></div>
            </div>

            <div className="grid  grid-cols-2 md:grid-cols-3 gap-6 items-center justify-center text-4xl font-semibold text-pri gap-x-4 md:gap-x-10">
                {/*   painter Card   */}
                <RoleCard
                    img={PAINTER_IMG}
                    name="painter"
                    setRole={setRole}
                    role={role}
                    small
                />

                {/*   Plumber Card   */}
                <RoleCard
                    img={PLUMBER_IMG}
                    name="plumber"
                    setRole={setRole}
                    role={role}
                    small
                />
                {/*   Designer Card   */}
                <RoleCard
                    img={DESIGNER_IMG}
                    name="designer"
                    setRole={setRole}
                    role={role}
                    small
                />
                {/*   packer Card   */}
                <RoleCard
                    img={PACKER_IMG}
                    name="packer"
                    setRole={setRole}
                    role={role}
                    small
                />
                {/*   Electrician Card   */}
                <RoleCard
                    img={ELECTRICIAN_IMG}
                    name="electrician"
                    setRole={setRole}
                    role={role}
                    small
                />
            </div>
            {/*     Btn     */}
            <ClickButton
                onClick={handleNext}
                disabled={works.some((work) => work === role) ? false : true}
                variant={"primary"}
            >
                <h1 className="capitalize">
                    {page === "signin" ? "Sign In " : "Sign Up " + "As " + role}
                </h1>
            </ClickButton>
        </motion.div>
    )
}

export default SelectWork
