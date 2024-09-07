import { useMutation } from "@tanstack/react-query";
import {
  updateProposalStatus,
  UpdateProposalStatusProps,
} from "@app/api/proposalAPI";

const useUpdateProposalStatus = () =>
  useMutation({
    mutationFn: ({ proposalId, status }: UpdateProposalStatusProps) =>
      updateProposalStatus({ proposalId, status }),
  });

export default useUpdateProposalStatus;
