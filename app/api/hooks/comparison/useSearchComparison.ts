/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GetComparisonResponse,
  searchComparison,
  SearchComparisonProps,
} from "@app/api/comparisonAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useSearchComparison = (
  { content, page }: SearchComparisonProps,
  options: any = {},
) =>
  useQuery<GetComparisonResponse>({
    queryKey: ["searchComparison", content, page],
    queryFn: () => searchComparison({ content, page }),
    placeholderData: keepPreviousData,
    ...options,
  });

export default useSearchComparison;
