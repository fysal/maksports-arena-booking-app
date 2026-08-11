import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Trophy } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./InputField";
import { registerTeam } from "@/app/lib/firebase/auth";

const schema = z
  .object({
    teamName: z.string().min(3, {
      message: "Team Name is required",
    }),
    contactPerson: z.string("Contact person name is required").min(6, {
      message: "Name must be longer than that",
    }),
    phoneNumber: z.string().min(10, {
      message: "Enter a valid Phone Number",
    }),

    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, {
      message: "Password must be 8 character or longer",
    }),
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   "Password must contain uppercase, lowercase, a number, and a special character",
    // )
    confirmPassword: z.string().min(1, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof schema>;

const RegisterTeam = () => {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await registerTeam(data);
  };

  return (
    <div className="rounded-xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-8 shadow-xl col-span-1">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-white">
          <Trophy size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">Register Team</h2>

          <p className="text-slate-500">Create a new team account.</p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-2 block text-sm font-medium">Team Name</label>

          <InputField
            type="text"
            useformProps={{ ...register("teamName") }}
            placeholderText="Kampala United FC"
            error={errors.teamName}
            isSubmitting={isSubmitting}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Contact Person
          </label>

          <InputField
            type="text"
            placeholderText="John Doe"
            useformProps={{ ...register("contactPerson") }}
            error={errors.contactPerson}
            isSubmitting={isSubmitting}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Phone Number</label>

          <InputField
            type="tel"
            placeholderText="+256 700 000000"
            useformProps={{ ...register("phoneNumber") }}
            error={errors.phoneNumber}
            isSubmitting={isSubmitting}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <InputField
            type="email"
            useformProps={{ ...register("email") }}
            error={errors.email}
            isSubmitting={isSubmitting}
            placeholderText="team@example.com"
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

        <div>
          <label className="mb-2 block text-sm font-medium">
            Confirm Password
          </label>
          <InputField
            useformProps={{
              ...register("confirmPassword"),
            }}
            type={!passwordVisible ? "password" : "text"}
            placeholderText="••••••••"
            isSubmitting={isSubmitting}
            error={errors.confirmPassword}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700">
          {!isSubmitting ? "Register Team" : "Registering team ..."}
        </button>
      </form>
    </div>
  );
};

export default RegisterTeam;
