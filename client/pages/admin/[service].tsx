import PendingCard from "@/components/admin/PendingCard"
import Title from "@/components/titles/Title"
import React from "react"

const PendingServices = () => {
    return (
        <main className="flex flex-col items-center justify-center flex-1 h-full py-2 dark:bg-dark bg-light md:px-10 md:py-6 p-4 gap-y-10 lg:gap-y-16">
            <Title>Pending Requests</Title>
            <PendingCard />
        </main>
    )
}

export default PendingServices
