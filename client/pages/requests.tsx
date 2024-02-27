import RequestCard from "@/components/requests/RequestCard"
import Title from "@/components/titles/Title"
import useUser from "@/store/useUser"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from "react"

const requests = () => {
    const user = useUser((state) => state.user)
    const { data: requests } = useQuery({
        queryKey: ["requests"],
        queryFn: () =>
            axios.get<RequestProps[]>(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/book/requested/${user?.id}`,
                { withCredentials: true }
            ),
        enabled: !!user,
    })
    return (
        <main className="flex h-full flex-1 flex-col justify-center items-center md:p-10 p-2 md:py-20 bg-gray-200 dark:bg-gray-800 gap-y-10">
            {requests ? (
                <>
                    <Title>My Requests</Title>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                        {requests.data.map((data, i) => (
                            <RequestCard data={data} key={i} />
                        ))}
                    </div>
                </>
            ) : (
                <Title>No Requests</Title>
            )}
        </main>
    )
}

export default requests
