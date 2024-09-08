import tokenInstance from "./tokenInstance";

interface InquiryItem {
  inquiryId: number;
  createdAt: string;
  name: string;
  email: string;
  phoneNum: string;
  comment: string;
  status: string;
}

export interface GetInquiryResponse {
  result: string;
  message: string;
  statusCode: number;
  data: {
    content: InquiryItem[];
    currentPage: number;
    numberOfElement: number;
    pageSize: number;
    totalElements: number;
    totalPage: number;
  };
}

export interface GetInquiryProps {
  startDate?: string;
  endDate?: string;
  status?: string;
  page: number;
}

export interface UpdateInquiryStatusProps {
  inquiryId: number;
  status: string;
}

export const getInquiry = async ({
  startDate,
  endDate,
  status,
  page,
}: GetInquiryProps): Promise<GetInquiryResponse> => {
  const response = await tokenInstance({
    url: "/inquiry",
    method: "get",
    params: { startDate, endDate, status, page },
  });
  return response.data;
};

export const updateInquiryStatus = async ({
  inquiryId,
  status,
}: UpdateInquiryStatusProps) => {
  const response = await tokenInstance({
    url: `/inquiry/status/${inquiryId}`,
    method: "patch",
    params: { status },
  });
  return response.data;
};

export const deleteInquiry = async (inquiryId: number) => {
  const response = await tokenInstance({
    url: `/inquiry/${inquiryId}`,
    method: "delete",
  });
  return response.data;
};
