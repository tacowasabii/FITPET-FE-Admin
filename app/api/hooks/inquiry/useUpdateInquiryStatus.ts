import { useMutation } from "@tanstack/react-query";
import {
  updateInquiryStatus,
  UpdateInquiryStatusProps,
} from "@app/api/inquiryAPI";

const useUpdateInquiryStatus = () =>
  useMutation({
    mutationFn: ({ inquiryId, status }: UpdateInquiryStatusProps) =>
      updateInquiryStatus({ inquiryId, status }),
  });

export default useUpdateInquiryStatus;
