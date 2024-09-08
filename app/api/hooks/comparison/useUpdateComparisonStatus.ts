import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateComparisonStatus,
  UpdateComparisonStatusProps,
} from "@app/api/comparisonAPI";

const useUpdateComparisonStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ comparisonId, status }: UpdateComparisonStatusProps) =>
      updateComparisonStatus({ comparisonId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comparison"] });
    },
  });
};

export default useUpdateComparisonStatus;
