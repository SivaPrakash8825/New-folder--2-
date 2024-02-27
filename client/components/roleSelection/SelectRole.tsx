import React from "react"
import WORKER_IMG from "@/public/images/workers.png"
import USER_IMG from "@/public/images/user.png"
import RoleCard from "../cards/RoleCard"
import Title from "../titles/Title"
import { ClickButton } from "../button/Button"
import { motion } from "framer-motion"

interface SelectRoleProps {
    role: RoleProps
    setRole: (role: RoleProps) => void
    handleNext: () => void
    page: "signin" | "signup"
}

const SelectRole = ({ role, setRole, handleNext, page }: SelectRoleProps) => {
    return (
        <motion.div
            className="flex flex-col gap-y-10 items-center"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
        >
            {/*    Choice Headign  */}
            <Title>{`${page === "signin" ? "SignIn As" : "SignUp As"}`}</Title>
            <div className="flex items-center justify-center text-4xl font-semibold text-pri gap-x-4 md:gap-x-10">
                {/*   User Card   */}
                <RoleCard
                    img={USER_IMG}
                    name="user"
                    setRole={setRole}
                    role={role}
                />

                <h1 className="text-xl md:text-3xl lg:text-4xl">Or</h1>

                {/*   Worker Card   */}

                <RoleCard
                    img={WORKER_IMG}
                    name="worker"
                    setRole={setRole}
                    role={role}
                />
            </div>
            {/*     Btn     */}
            <ClickButton
                onClick={handleNext}
                disabled={role === "user" || role === "worker" ? false : true}
                variant={"primary"}
            >
                <h1>
                    {role === "user"
                        ? `${page === "signin" ? "Sign In" : "Sign Up"} As User`
                        : role === "worker"
                        ? `${
                              page === "signin" ? "Sign In" : "Sign Up"
                          } As Worker`
                        : `${page === "signin" ? "Sign In" : "Sign Up"}`}
                </h1>
            </ClickButton>
        </motion.div>
    )
}

export default SelectRole
