import { Eye, EyeOff, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "./InputField";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/app/lib/firebase/auth";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, {
    message: "Please enter password",
  }),
});

type loginData = z.infer<typeof schema>;

const TeamLogin = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<loginData>({ resolver: zodResolver(schema) });

  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);


  const onHandleSubmit: SubmitHandler<loginData> = async (data) => {
    await loginUser(data.email, data.password);
   
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-xl col-span-1">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
          <Users size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">Team Login</h2>

          <p className="text-slate-500">Access your dashboard and bookings.</p>
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
            type="email"
            placeholderText="team@example.com"
            isSubmitting={isSubmitting}
            error={errors.email}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Password</label>

          <div className="relative">
            <InputField
              useformProps={{
                ...register("password"),
              }}
              type={!passwordVisible ? "password" : "text"}
              placeholderText="••••••••"
              isSubmitting={isSubmitting}
              error={errors.password}
            />
            <button
              type="button"
              className="absolute right-5 top-3 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}>
              {!passwordVisible ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-green-600 hover:text-green-700">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-slate-900">
          {!isSubmitting ? "Login" : "Logging in..."}
        </button>
      </form>
    </div>
  );
};

export default TeamLogin;
