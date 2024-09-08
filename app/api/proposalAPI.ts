import tokenInstance from "./tokenInstance";

interface ProposalItem {
  proposalId: number;
  createdAt: string;
  name: string;
  email: string;
  phoneNum: string;
  comment: string;
  status: string;
}

export interface GetProposalResponse {
  result: string;
  message: string;
  statusCode: number;
  data: {
    content: ProposalItem[];
    currentPage: number;
    numberOfElement: number;
    pageSize: number;
    totalElements: number;
    totalPage: number;
  };
}

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
}: GetProposalProps): Promise<GetProposalResponse> => {
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
