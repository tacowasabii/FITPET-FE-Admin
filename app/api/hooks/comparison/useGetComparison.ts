/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getComparison,
  GetComparisonProps,
  GetComparisonResponse,
} from "@app/api/comparisonAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetComparison = (
  { page, startDate, endDate, status }: GetComparisonProps,
  options: any = {},
) =>
  useQuery<GetComparisonResponse>({
    queryKey: ["comparison", page, startDate, endDate, status],
    queryFn: () => getComparison({ page, startDate, endDate, status }),
    placeholderData: keepPreviousData,
    ...options,
  });

export default useGetComparison;
