import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProposalStatus,
  UpdateProposalStatusProps,
} from "@app/api/proposalAPI";

const useUpdateProposalStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ proposalId, status }: UpdateProposalStatusProps) =>
      updateProposalStatus({ proposalId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal"] });
    },
  });
};

export default useUpdateProposalStatus;
