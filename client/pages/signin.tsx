import SignIn from "@/components/signin/SignIn";
// import Toast from "@components/Toast/Toast"
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInInputProps, signInSchema } from "@/schema/signin.schema";
// import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SelectRole from "@/components/roleSelection/SelectRole";
import SelectWork from "@/components/roleSelection/SelectWork";
import useToast from "@/store/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "@/store/useUser";
// import useToast from "@store/useToast"
// import setErrorMsg from "@utils/setErrorMsg"

const signin = () => {
  const [role, setRole] = useState<RoleProps>("");
  const [step, setStep] = useState(0);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInInputProps>({
    resolver: zodResolver(signInSchema),
  });

  const handleBack = () => {
    setStep((e) => e - 1);
  };

  const handleNext = () => {
    setStep((e) => e + 1);
  };

  type Data = SignInInputProps & {
    role: RoleProps;
  };

  const mutateFunc = async (data: Data) => {
    console.log("mutateFunc : ", data);

    return await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/auth/login`,
      data,
      {
        withCredentials: true,
      }
    );
  };

  const { setToast } = useToast(({ setToast }) => ({ setToast }));
  const setUser = useUser((state) => state.setUser);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: mutateFunc,
    onSuccess: (resp) => {
      setToast({
        msg: resp.data.msg,
        variant: "success",
      });
      
      setUser(resp.data.data);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (resp.data.data.role === "user") router.push("/");
      else router.push("/");
    },
    onError: (e: any) => {
      setToast({
        msg: e.response.data.msg,
        variant: "error",
      });
    },
  });

  const handleSignIn = async (e: SignInInputProps) => {
    const data = { ...e, role };
    console.log(data);

    try {
      mutate(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center flex-1 h-full py-2 dark:bg-dark bg-light md:px-10 md:py-6 p-4 gap-y-10 lg:gap-y-16">
      {/*           Step - 0       */}
      {step == 0 && (
        <SelectRole
          role={role}
          setRole={setRole}
          handleNext={() => {
            if (role === "user") return setStep((e) => e + 2);
            return handleNext();
          }}
          page={"signin"}
        />
      )}
      {/*         Step - 1        */}

      {step == 1 && (
        <SelectWork
          handleBack={handleBack}
          role={role}
          handleNext={handleNext}
          page={"signin"}
          setRole={setRole}
        />
      )}

      {/*         End Step - 1       */}
      {/*      Step - 2    */}
      {step == 2 && (
        <SignIn
          role={role}
          handleBack={role === "user" ? () => setStep(0) : handleBack}
          handleSubmit={handleSubmit}
          errors={errors}
          register={register}
          handleSignIn={handleSignIn}
        />
      )}
      {/*      End Step - 12   */}
    </main>
  );
};

export default signin;
