import tokenInstance from "./tokenInstance";

export interface GetProposalProps {
  startDate?: string;
  endDate?: string;
  status?: string;
  page: number;
}

export interface UpdateProposalStatusProps {
  proposalId: number;
  status: string;
}

export const getProposal = async ({
  startDate,
  endDate,
  status,
  page,
}: GetProposalProps) => {
  const response = await tokenInstance({
    url: "/proposal",
    method: "get",
    params: { startDate, endDate, status, page },
  });
  return response.data;
};

export const updateProposalStatus = async ({
  proposalId,
  status,
}: UpdateProposalStatusProps) => {
  const response = await tokenInstance({
    url: `/proposal/status/${proposalId}`,
    method: "patch",
    params: { status },
  });
  return response.data;
};

export const deleteProposal = async (proposalId: number) => {
  const response = await tokenInstance({
    url: `/proposal/${proposalId}`,
    method: "delete",
  });
  return response.data;
};
