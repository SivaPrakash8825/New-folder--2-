import RoleCard from "@/components/cards/RoleCard"
import Title from "@/components/titles/Title"
import React, { useState } from "react"
import PAINTER_IMG from "@/public/images/painter.png"
import PLUMBER_IMG from "@/public/images/plumber.png"
import PACKER_IMG from "@/public/images/packer.png"
import DESIGNER_IMG from "@/public/images/designer.png"
import ELECTRICIAN_IMG from "@/public/images/electrician.png"
import { ClickButton, LinkButton } from "@/components/button/Button"

const index = () => {
    const [role, setRole] = useState<RoleProps>("")

    return (
        <main className="flex flex-col items-center justify-center flex-1 h-full py-2 dark:bg-dark bg-light md:px-10 md:py-6 p-4 gap-y-10 lg:gap-y-16">
            <Title>Select A Service</Title>
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
            <LinkButton
                link={`/admin/${role}`}
                disabled={role ? false : true}
                variant={"primary"}
            >
                <h1 className="capitalize">{"Select As " + role}</h1>
            </LinkButton>
        </main>
    )
}

export default index
