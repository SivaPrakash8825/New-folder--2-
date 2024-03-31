import React, { useState } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { ClickButton } from "../button/Button";
import { BiUser } from "react-icons/bi";
import axios from "axios";
import useToast from "@/store/useToast";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "../modal/Modal";
import useToggle from "@/hooks/useToggle";
import Title from "../titles/Title";

const RequestCard = ({ data }: { data: RequestProps }) => {
  // const [status, setStatus] = useState<RequestStatus>(data.status);
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { isOn, toggleOn } = useToggle();

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

  const setDateandTime = async () => {
    try {
      // console.log(data.id);
      // setStatus(status);
      // console.log("setData");

      return true;
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateStatus = async (status: RequestStatus) => {
    try {
      console.log(data.id, status);
      if (status == "accepted") {
        const result = await setDateandTime();
        if (!result) {
          return;
        }
      }
      console.log("here");

      // setStatus(status);
      return;
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

  // useEffect(() => {
  //   setOptions((prev) => {
  //     if (status == "pending") {
  //       return ["Accept", "Reject"];
  //     } else if (status == "accepted") {
  //       return ["AtWork", "Completed"];
  //     } else if (status == "atwork") {
  //       return ["Completed"];
  //     } else {
  //       return [];
  //     }
  //   });
  // }, [status]);

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

        {data.status == "completed" && (
          <div className=" bg-green-500 text-white p-2 rounded w-full text-center font-semibold">
            Completed
          </div>
        )}
        {data.status == "rejected" && (
          <div className=" bg-red-500 text-white p-2 rounded w-full text-center font-semibold">
            Rejected
          </div>
        )}
        <Modal isOn={isOn} toggleOn={toggleOn}>
          <div>
            <Title>Set a Date & Time</Title>
            <input
              type="datetime-local"
              className="mt-2 w-full p-2 overflow-y-auto text-white transition-all border-b-2 rounded-t-sm peer placeholder:text-transparent outline-0 bg-pri/70 border-pri/70 placeholder-shown:bg-transparent focus:bg-pri/70 font-sm "
            />

            <ClickButton
              onClick={() => updateStatus("accepted")}
              size={"small"}
              className="mt-4 mx-auto"
            >
              <h1>Book !!</h1>
            </ClickButton>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default RequestCard;
