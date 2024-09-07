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
      link.setAttribute("download", "SC_견적_요청_정보.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast({
        title: "리스트가 성공적으로 내보내졌습니다.",
        status: "success",
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "리스트 내보내기에 실패했습니다.",
        status: "error",
        isClosable: true,
      });
    },
  });
};

export default useGetComparisonExcel;
