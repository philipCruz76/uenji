"use client";
import { FC, FormEvent, useState } from "react";
import { Input } from "../ui/Input";
import { resetPassword } from "@/lib/actions/resetUserPassword";
import { PasswordResetSchema } from "@/types/passwordReset.types";

type PasswordResetFormProps = {
  userEmail: string;
};

const PasswordResetForm: FC<PasswordResetFormProps> = ({ userEmail }) => {
  const [validPassword, setValidPassword] = useState<string>("");
  const [passWordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const confirmPasswordErrorMessage = "Passwords do not match";

  const validatePassword = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    const result = await PasswordResetSchema.safeParseAsync(value);
    if (!result.success) {
      setPasswordErrorMessage(result.error.issues[0].message);
    } else {
      setValidPassword(value);
      setPasswordErrorMessage("");
    }
  };

  const validateConfirmPassword = async (data: FormEvent<HTMLInputElement>) => {
    if (validPassword !== data.currentTarget.value) {
      setPasswordErrorMessage(confirmPasswordErrorMessage);
    } else {
      setPasswordErrorMessage("");
    }
  };
  return (
    <div className="flex flex-row items-center justify-center text-center w-full h-full ">
      <form
        className="flex flex-col space-y-4 max-w-[500px] w-full h-[305px]"
        action={(data) => resetPassword(data, userEmail, validPassword)}
      >
        <label className="font-semibold text-2xl py-2">Reset Password</label>
        <Input
          className="w-full border-zinc-300 rounded-sm"
          required
          placeholder="New Password"
          type="password"
          id="password"
          onChange={async (data) => validatePassword(data)}
        />

        <Input
          type="password"
          id="confirmPassword"
          required
          className="w-full border-zinc-300 rounded-sm"
          placeholder="Confirm Password"
          onChange={async (data) => validateConfirmPassword(data)}
        />

        <span className="flex text-start text-red-500 text-sm">
          {passWordErrorMessage}
        </span>
        <button
          disabled={passWordErrorMessage != ""}
          type="submit"
          className="flex items-center justify-center w-full h-10 text-sm font-semibold text-white bg-zinc-600 rounded-md"
        >
          {" "}
          Change{" "}
        </button>
      </form>
    </div>
  );
};

export default PasswordResetForm;
