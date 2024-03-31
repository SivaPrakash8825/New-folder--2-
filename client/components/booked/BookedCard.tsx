import React, { useState } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { ClickButton } from "../button/Button";
import { BiUser } from "react-icons/bi";
import axios from "axios";
import useToast from "@/store/useToast";
import { useQueryClient } from "@tanstack/react-query";

const BookedCard = ({ data }: { data: RequestProps }) => {
  // const [status, setStatus] = useState<RequestStatus>(data.status);
  const { setToast } = useToast();
  const queryClient = useQueryClient();

  const statusWithOptions: {
    [key in RequestStatus]: { option: string; status: RequestStatus }[];
  } = {
    pending: [
      { option: "Accept", status: "accepted" },
      { option: "Reject", status: "rejected" },
    ],
    accepted: [
      { option: "AtWork", status: "atwork" },
      { option: "Cancel", status: "rejected" },
    ],
    atwork: [{ option: "Completed", status: "completed" }],
    rejected: [],
    completed: [],
    cancelled: [],
  };

  const updateStatus = async (status: RequestStatus) => {
    try {
      console.log(data.id, status);
      // setStatus(status);

      const { data: resData } = await axios.patch(
        `http://localhost:9000/api/book/status`,
        {
          id: data.id,
          status: status,
        }
      );
      console.log(resData);
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
      setToast({
        msg: "Status updated successfully",
        variant: "success",
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex rounded-xl shadow-xl bg-light dark:bg-dark items-center  overflow-hidden group border-2 border-pri">
      {/* Left Side */}
      <div className="text-[10rem]  transition-all bg-pri  text-black/60 h-full  py-14 flex flex-1">
        <BiUser />
      </div>
      {/* Right Side */}

      <div className="flex justify-start items-start flex-col gap-y-4 p-4 dark:text-light text-dark   relative">
        {/* Name */}
        <h1 className="text-pri text-3xl font-semibold">{data.name}</h1>
        {/* Phone */}
        <div className="flex items-center justify-center gap-x-2 ">
          <AiOutlinePhone />
          <p>{data.phoneno}</p>
        </div>
        {/* Email */}
        <div className="flex items-center justify-center gap-x-2 ">
          <AiOutlineMail />
          <p>{data.email}</p>
        </div>
        {/* Address */}
        {/* <div className="flex items-center justify-center gap-x-2 ">
                    <FaRegAddressCard />
                    <p>{"13/dasdas sadasd "}</p>
                </div> */}
        {/*   Btn   */}
        <div className="flex flex-row gap-4">
          <a
            className="rounded-full outline-0 text-white font-semibold shadow-lg shadow-black/50 bg-pri px-3 md:py-2 py-3  text-lg md:text-xl hover:scale-105 active:scale-95 transition-all"
            href={`tel:${data.phoneno}`}
          >
            <AiOutlinePhone />
          </a>
          <a
            className="rounded-full outline-0 text-white font-semibold shadow-lg shadow-black/50 bg-pri px-3 md:py-2 py-3  text-lg md:text-xl hover:scale-105 active:scale-95 transition-all"
            href={`mailto:${data.email}`}
          >
            <AiOutlineMail />
          </a>
        </div>

        <div className="flex gap-4">
          {statusWithOptions[data.status]?.map((option, i) => (
            <ClickButton
              key={i}
              children={option.option}
              size={"small"}
              variant={i == 0 ? "primary" : "secondary"}
              onClick={() => updateStatus(option.status)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookedCard;
