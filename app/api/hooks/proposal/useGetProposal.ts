import {
  getProposal,
  GetProposalProps,
  GetProposalResponse,
} from "@app/api/proposalAPI";
import { useQuery } from "@tanstack/react-query";

const useGetProposal = ({
  startDate,
  endDate,
  status,
  page,
}: GetProposalProps) =>
  useQuery<GetProposalResponse>({
    queryKey: ["proposal", startDate, endDate, status, page],
    queryFn: () => getProposal({ startDate, endDate, status, page }),
  });

export default useGetProposal;
