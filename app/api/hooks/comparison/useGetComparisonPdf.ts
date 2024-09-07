import { getComparisonPdf } from "@app/api/comparisonAPI";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

const useGetComparisonPdf = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (comparisonId: number) => getComparisonPdf(comparisonId),
    onSuccess: (response, comparisonId) => {
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `견적서_${comparisonId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
      toast({
        title: "PDF 파일이 성공적으로 열렸습니다.",
        status: "success",
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "PDF 파일을 여는 데 실패했습니다.",
        status: "error",
        isClosable: true,
      });
    },
  });
};

export default useGetComparisonPdf;
