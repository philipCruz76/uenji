"use client";
import { FC, FormEvent, useState } from "react";
import { Input } from "@/components/ui/Input";
import { resetPassword } from "@/lib/actions/resetUserPassword";
import { PasswordResetSchema } from "@/types/passwordReset.types";
import { useTranslations } from "next-intl";

type PasswordResetFormProps = {
  userEmail: string;
};

const PasswordResetForm: FC<PasswordResetFormProps> = ({ userEmail }) => {
  const [validPassword, setValidPassword] = useState<string>("");
  const [passWordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const confirmPasswordErrorMessage = "Passwords do not match";
  const passwordResetText = useTranslations("PasswordReset");

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
    <div className="flex h-full w-full flex-row items-center justify-center text-center">
      <form
        className="flex h-[305px] w-full max-w-[500px] flex-col space-y-4"
        action={(data) => resetPassword(data, userEmail, validPassword)}
      >
        <label className="py-2 text-2xl font-semibold">
          {passwordResetText("title")}
        </label>
        <Input
          className="w-full rounded-sm border-zinc-300"
          required
          placeholder={passwordResetText("passwordPlaceholder")}
          type="password"
          id="password"
          onChange={async (data) => validatePassword(data)}
        />

        <Input
          type="password"
          id="confirmPassword"
          required
          className="w-full rounded-sm border-zinc-300"
          placeholder={passwordResetText("confirmPasswordPlaceholder")}
          onChange={async (data) => validateConfirmPassword(data)}
        />

        <span className="flex text-start text-sm text-red-500">
          {passWordErrorMessage}
        </span>
        <button
          disabled={passWordErrorMessage != ""}
          type="submit"
          className="flex h-10 w-full items-center justify-center rounded-md bg-zinc-600 text-sm font-semibold text-white"
        >
          {passwordResetText("changeButton")}
        </button>
      </form>
    </div>
  );
};

export default PasswordResetForm;
