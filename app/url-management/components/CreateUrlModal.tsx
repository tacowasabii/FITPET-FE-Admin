"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { CloseIcon } from "@public/svg";
import useCreateReferSite from "@app/api/hooks/refersite/useCreateReferSite";

interface CreateUrlModalProps {
  onClose: () => void;
}

interface FormValues {
  channelKor: string;
  channel: string;
  url: string;
}

function CreateUrlModal({ onClose }: CreateUrlModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const { mutate: createReferSite } = useCreateReferSite();

  const onSubmit = (data: FormValues) => {
    createReferSite(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-[594px] w-[504px] flex-col overflow-hidden rounded-3xl bg-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-grow flex-col"
        >
          <div className="mb-8 mt-6 flex flex-col gap-8 px-8 text-lg">
            <div className="flex justify-between">
              <div className="text-3xl font-semibold">URL 추가</div>
              <CloseIcon onClick={handleClose} className="cursor-pointer" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-medium text-grayscale-80">
                유입채널 한글명
              </div>
              <input
                placeholder="유입채널 한글명"
                className={`rounded-xl bg-grayscale-05 px-6 py-4 placeholder:text-grayscale-40 focus:outline focus:outline-1 ${
                  errors.channelKor
                    ? "outline outline-1 outline-danger"
                    : "focus:outline-primary-50"
                }`}
                {...register("channelKor", {
                  required: true,
                })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium text-grayscale-80">채널</div>
              <input
                placeholder="채널"
                className={`rounded-xl bg-grayscale-05 px-6 py-4 placeholder:text-grayscale-40 focus:outline focus:outline-1 ${
                  errors.channel
                    ? "outline outline-1 outline-danger"
                    : "focus:outline-primary-50"
                }`}
                {...register("channel", { required: true })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-medium text-grayscale-80">URL</div>
              <textarea
                placeholder="URL"
                className={`h-[113px] resize-none rounded-xl bg-grayscale-05 px-6 py-4 placeholder:text-grayscale-40 focus:outline focus:outline-1 ${
                  errors.url
                    ? "outline outline-1 outline-danger"
                    : "focus:outline-primary-50"
                }`}
                {...register("url", { required: true })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-1 w-full bg-primary-50 py-5 text-xl font-medium text-white"
          >
            추가
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUrlModal;
