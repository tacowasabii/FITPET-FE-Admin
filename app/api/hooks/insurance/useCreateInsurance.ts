import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { createInsurance, CreateInsuranceProps } from "@app/api/insuranceAPI";

const useCreateInsurance = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (data: CreateInsuranceProps) => createInsurance(data),
    onSuccess: () => {
      toast({
        title: "보험 정보가 성공적으로 추가되었습니다.",
        status: "success",
        isClosable: true,
      });
    },
  });
};

export default useCreateInsurance;
