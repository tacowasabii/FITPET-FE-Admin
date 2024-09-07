import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComparison } from "@app/api/comparisonAPI";

const useDeleteComparison = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comparisonId: number) => deleteComparison(comparisonId),
    onSuccess: () => {
      toast({
        title: "견적서가 성공적으로 삭제되었습니다.",
        status: "success",
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ["comparison"] });
    },
  });
};

export default useDeleteComparison;
