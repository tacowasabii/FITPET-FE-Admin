import tokenInstance from "./tokenInstance";

interface Insurance {
  insuranceId: number;
  petType: string;
  age: number;
  dogBreedRank: string | null;
  renewalCycle: string;
  coverageRatio: string;
  deductible: string;
  compensation: string;
  premium: number;
}

export interface GetInsuranceDataResponse {
  content: Insurance[];
  currentPage: number;
  pageSize: number;
  numberOfElement: number;
  totalElements: number;
  totalPage: number;
}

export interface GetInsuranceProps {
  company: string;
  petType: string;
  page: number;
}

export const getInsurance = async ({
  company,
  petType,
  page,
}: GetInsuranceProps): Promise<GetInsuranceDataResponse> => {
  const response = await tokenInstance({
    url: "/insurance",
    method: "get",
    params: { company, petType, page },
  });
  return response.data;
};

export interface CreateInsuranceProps {
  company: string;
  petType: string;
  age: number;
  dogBreedRank: string;
  renewalCycle: string;
  coverageRatio: string;
  deductible: string;
  compensation: string;
  premium: number;
}

export const createInsurance = async (data: CreateInsuranceProps) => {
  const response = await tokenInstance({
    url: "/insurance",
    method: "post",
    data,
  });
  return response.data;
};

export const deleteInsurance = async (insuranceId: number) => {
  const response = await tokenInstance({
    url: `/insurance/${insuranceId}`,
    method: "delete",
  });
  return response.data;
};

interface UpdateInsuranceProps {
  insuranceId: number;
  premium: number;
}

export const updateInsurance = async ({
  insuranceId,
  premium,
}: UpdateInsuranceProps) => {
  const response = await tokenInstance({
    url: `/insurance/${insuranceId}`,
    method: "patch",
    params: { premium },
  });
  return response.data;
};

export const getInsuranceExcel = async () => {
  const response = await tokenInstance({
    url: "/insurance/downloads",
    method: "get",
    responseType: "blob",
  });
  return response;
};
