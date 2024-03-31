import BookedCard from "@/components/booked/BookedCard";
import RequestCard from "@/components/requests/RequestCard";
import Title from "@/components/titles/Title";
import useUser from "@/store/useUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const booked = () => {
  const [requests, setRequests] = useState<RequestProps[]>([]);
  const user = useUser((state) => state.user);
  const { data } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      console.log("requets in");

      return await axios.get<RequestProps[]>(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/book/booked/${user?.id}`,
        { withCredentials: true }
      );
    },
    enabled: !!user,
  });
  useEffect(() => {
    if (data) {
      console.log("data has");
      console.log(data.data);

      setRequests(data.data);
    } else {
      console.log("no data");
    }
  }, [data]);
  // console.log(requests);

  return (
    <main className="flex h-full flex-1 flex-col justify-center items-center md:p-10 p-2 md:py-20 bg-gray-200 dark:bg-gray-800 gap-y-10">
      {requests?.length != 0 ? (
        <>
          <Title>My Requests</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {requests?.map((data, i) => (
              <BookedCard data={data} key={i} />
            ))}
          </div>
        </>
      ) : (
        <Title>No Booked</Title>
      )}
    </main>
  );
};

export default booked;
