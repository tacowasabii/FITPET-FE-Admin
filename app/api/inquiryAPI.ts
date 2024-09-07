import tokenInstance from "./tokenInstance";

export interface GetInquiryProps {
  startDate: string;
  endDate: string;
  status?: string;
  page: number;
}

const getInquiry = async ({
  startDate,
  endDate,
  status,
  page,
}: GetInquiryProps) => {
  const response = await tokenInstance({
    url: "/inquiry",
    method: "get",
    params: { startDate, endDate, status, page },
  });
  return response.data;
};

export default getInquiry;
