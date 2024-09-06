"use client";

import { WarningIcon } from "@public/svg";
import Image from "next/image";
import { useForm } from "react-hook-form";

type LoginFormValues = {
  id: string;
  password: string;
};

export default function Home() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormValues>();

  const watchedFields = watch(["id", "password"]);

  const isFormValid =
    watchedFields.every((field) => field) && !Object.keys(errors).length;

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-[360px] w-[1032px] justify-between overflow-hidden rounded-3xl bg-white">
        <div className="ml-10 mt-10 flex flex-col gap-8">
          <Image
            alt="sc_logo"
            src="/assets/sc_logo.webp"
            width={180}
            height={48}
          />
          <div className="text-[48px] text-grayscale-100">관리자 로그인</div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-grow items-center justify-center">
            <div className="flex w-[440px] flex-col gap-8 text-md font-medium">
              <div className="relative w-full">
                <input
                  {...register("id", {
                    required: "아이디를 입력해주세요.",
                  })}
                  className={`h-[66px] w-full rounded-xl bg-grayscale-00 px-4 outline outline-1 outline-grayscale-20 placeholder:text-grayscale-40 ${
                    errors.id
                      ? "outline outline-1 outline-danger"
                      : "focus:outline-primary-50"
                  }`}
                  placeholder="관리자 아이디"
                />
                {errors.id && (
                  <p className="absolute -bottom-6 flex items-center text-sm text-danger">
                    <WarningIcon className="mx-1" />
                    {errors.id?.message?.toString()}
                  </p>
                )}
              </div>
              <div className="relative w-full">
                <input
                  {...register("password", {
                    required: "비밀번호를 입력해주세요.",
                  })}
                  className={`h-[66px] w-full rounded-xl bg-grayscale-00 px-4 outline outline-1 outline-grayscale-20 placeholder:text-grayscale-40 ${
                    errors.password
                      ? "outline outline-1 outline-red-500"
                      : "focus:outline-primary-50"
                  }`}
                  placeholder="비밀번호"
                />
                {errors.password && (
                  <p className="absolute -bottom-6 flex items-center text-sm text-danger">
                    <WarningIcon className="mx-1" />
                    {errors.password?.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`w-[504px] rounded-tl-3xl ${
              isFormValid
                ? "bg-primary-50 text-white"
                : "bg-grayscale-05 text-grayscale-40"
            } py-5`}
          >
            로그인
          </button>
        </div>
      </div>
    </form>
  );
}
