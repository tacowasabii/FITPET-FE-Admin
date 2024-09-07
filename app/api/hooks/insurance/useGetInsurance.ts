import {
  getInsurance,
  GetInsuranceDataResponse,
  GetInsuranceProps,
} from "@app/api/insuranceAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetInsurance = ({ company, petType, page }: GetInsuranceProps) =>
  useQuery<GetInsuranceDataResponse>({
    queryKey: ["insuranceData", company, petType, page],
    queryFn: () => getInsurance({ company, petType, page }),
    placeholderData: keepPreviousData,
  });

export default useGetInsurance;
