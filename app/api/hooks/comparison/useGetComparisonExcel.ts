import {
  getComparisonExcel,
  GetComparisonExcelProps,
} from "@app/api/comparisonAPI";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

const useGetComparisonExcel = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: (params: GetComparisonExcelProps) => getComparisonExcel(params),
    onSuccess: (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "견적리스트.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast({
        title: "리스트가 성공적으로 내보내졌습니다.",
        status: "success",
        isClosable: true,
      });
    },
  });
};

export default useGetComparisonExcel;
