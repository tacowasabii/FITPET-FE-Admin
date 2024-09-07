import tokenInstance from "./tokenInstance";

export interface GetComparisonProps {
  page: number;
  startDate: string;
  endDate: string;
  status?: string;
}
export interface GetComparisonExcelProps {
  startDate: string;
  endDate: string;
  status?: string;
}

export interface GetComparisonSearchProps {
  content: string;
  page: number;
}

export interface ComparisonItem {
  comparisonId: number;
  createdAt: string;
  petType: string;
  petSpecies: string;
  petName: string;
  petAge: number;
  phoneNumber: string;
  status: string;
  comment: string;
  referSite: string | null;
  referUserId: string | null;
}

export interface GetComparisonResponse {
  result: string;
  message: string;
  statusCode: number;
  data: {
    content: ComparisonItem[];
    currentPage: number;
    numberOfElement: number;
    pageSize: number;
    totalElements: number;
    totalPage: number;
  };
}

const getComparison = async ({
  page,
  startDate,
  endDate,
  status,
}: GetComparisonProps): Promise<GetComparisonResponse> => {
  const response = await tokenInstance({
    url: "/comparison",
    method: "get",
    params: { page, startDate, endDate, status },
  });
  return response.data;
};

const getComparisonExcel = async ({
  startDate,
  endDate,
  status,
}: GetComparisonExcelProps) => {
  const response = await tokenInstance({
    url: "/comparison/downloads",
    method: "get",
    params: { startDate, endDate, status },
    responseType: "blob",
  });
  return response.data;
};

const getComparisonPdf = async (comparisonId: number) => {
  const response = await tokenInstance({
    url: `/comparison/${comparisonId}/pdf`,
    method: "get",
    params: { comparisonId },
    responseType: "blob",
  });
  return response.data;
};

const getComparisonSearch = async ({
  content,
  page,
}: GetComparisonSearchProps) => {
  const response = await tokenInstance({
    url: "/comparison/search",
    method: "get",
    params: { content, page },
  });
  return response.data;
};

const deleteComparison = async (comparisonId: number) => {
  const response = await tokenInstance({
    url: `/comparison/${comparisonId}`,
    method: "delete",
  });
  return response.data;
};

export {
  getComparison,
  getComparisonExcel,
  getComparisonPdf,
  getComparisonSearch,
  deleteComparison,
};
