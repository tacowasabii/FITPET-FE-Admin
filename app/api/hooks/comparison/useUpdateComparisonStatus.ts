import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import {
  updateComparisonStatus,
  UpdateComparisonStatusProps,
} from "@app/api/comparisonAPI";

const useUpdateComparisonStatus = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ comparisonId, status }: UpdateComparisonStatusProps) =>
      updateComparisonStatus({ comparisonId, status }),
    onSuccess: () => {
      toast({
        title: "상태가 업데이트되었습니다.",
        status: "success",
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ["comparison"] });
    },
  });
};

export default useUpdateComparisonStatus;
