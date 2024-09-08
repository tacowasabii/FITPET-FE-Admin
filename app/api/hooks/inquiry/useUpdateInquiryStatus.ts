import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateInquiryStatus,
  UpdateInquiryStatusProps,
} from "@app/api/inquiryAPI";

const useUpdateInquiryStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ inquiryId, status }: UpdateInquiryStatusProps) =>
      updateInquiryStatus({ inquiryId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiry"] });
    },
  });
};

export default useUpdateInquiryStatus;
