import Modal from "@/components/modal/Modal";
import SelectCity from "@/components/services/SelectCity";
import ServiceDetailsCard from "@/components/services/ServiceDetailsCard";
import Title from "@/components/titles/Title";
import useCity from "@/store/useCity";
import useUser from "@/store/useUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React from "react";
import { shallow } from "zustand/shallow";

const ServiceDetails = () => {
  const service = useSearchParams().get("service");
  const { city, setCity } = useCity(
    (state) => ({ city: state.city, setCity: state.setCity }),
    shallow
  );
  const user = useUser((state) => state.user);
  const { data } = useQuery({
    queryKey: [city],
    queryFn: () =>
      axios.post<WorkerProps[]>(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/workers/getRequestsByCity`,
        { city, role: service, userId: user?.id },
        { withCredentials: true }
      ),
    enabled: !!service && !!city,
  });

  console.log(data);

  return (
    <main className="bg-gray-200 dark:bg-gray-800 p-3 md:-10 flex flex-col  h-full flex-1 items-center pt-20">
      {<SelectCity />}

      {data && data?.data.length > 0 ? (
        <>
          <Title>{service! + "s Near By You!!"}</Title>
          <div className=" mt-10 grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-3">
            {data.data.map((d, i) => (
              <ServiceDetailsCard key={i} data={d} />
            ))}

            {/* <ServiceDetailsCard /> */}
            {/* <ServiceDetailsCard /> */}
          </div>
        </>
      ) : (
        <Title>{`No ${service}s Found Near You `}</Title>
      )}
    </main>
  );
};

export default ServiceDetails;
