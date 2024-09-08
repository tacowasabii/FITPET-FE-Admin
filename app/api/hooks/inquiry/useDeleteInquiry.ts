import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { deleteInquiry } from "@app/api/inquiryAPI";

const useDeleteInquiry = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inquiryId: number) => deleteInquiry(inquiryId),
    onSuccess: () => {
      toast({
        title: "문의가 성공적으로 삭제되었습니다.",
        status: "success",
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ["inquiry"] });
    },
  });
};

export default useDeleteInquiry;
