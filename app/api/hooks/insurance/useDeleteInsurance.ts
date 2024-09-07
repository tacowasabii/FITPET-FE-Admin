import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { deleteInsurance } from "@app/api/insuranceAPI";

const useDeleteInsurance = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (insuranceId: number) => deleteInsurance(insuranceId),
    onSuccess: () => {
      toast({
        title: "보험 정보가 성공적으로 삭제되었습니다.",
        status: "success",
        isClosable: true,
      });
    },
  });
};

export default useDeleteInsurance;
