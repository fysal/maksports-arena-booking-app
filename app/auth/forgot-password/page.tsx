"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Users } from "lucide-react";
import React, { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import InputField from "../widgets/inputfield";
import Link from "next/link";
import { forgotPassword } from "@/app/lib/firebase/auth";

const schema = z.object({
  email: z.email("Enter a valid email address"),
});

type resetData = z.infer<typeof schema>;

type resData = {
  state: boolean | null;
  message: string | null;
};

const ForgotPassword = () => {
  const [resultInfo, setResultInfo] = useState<resData>({
    state: null,
    message: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<resetData>({ resolver: zodResolver(schema) });

  const onHandleSubmit: SubmitHandler<resetData> = async (data) => {
    //reset code goes here
    console.log(data);
    const result = await forgotPassword(data.email);

    if (result.success) {
      setResultInfo({ state: result.success, message: result.message! });
    } else {
      setResultInfo({ state: result.success, message: result.error! });
    }
  };

  return (
    <Fragment>
      <div className="max-w-3xl mb-20 mt-20 mx-auto rounded-xl border border-slate-200 bg-white p-8 shadow-xl col-span-1">
        {resultInfo.state === true && (
          <div className="bg-green-100/50 border border-green-900/20 rounded-lg p-4 mb-10 text-green-700 text-sm font-medium">
            {resultInfo.message}
          </div>
        )}
        {resultInfo.state === false && (
          <div className="bg-red-100/50 border border-red-900/20 reounded-lg p-4 mb-10 text-red-700 text-sm font-medium">
            {resultInfo.message}
          </div>
        )}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <Users size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Forgot password
            </h2>

            <p className="text-slate-500">
              Enter your email address to get the resent link.
            </p>
          </div>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit(onHandleSubmit)}>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <InputField
              useformProps={{
                ...register("email"),
              }}
              type="text"
              placeholderText="team@example.com"
              isSubmitting={isSubmitting}
              error={errors.email}
            />
          </div>

          <div className="flex items-center justify-end">
            <Link
              href="/auth?act=login"
              className="text-sm font-medium text-green-600 hover:text-green-700">
              I&apos;ve remembered my password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-slate-900">
            {!isSubmitting ? "Submit" : "Submitting..."}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
