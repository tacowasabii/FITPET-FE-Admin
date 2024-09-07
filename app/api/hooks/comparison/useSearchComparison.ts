import {
  GetComparisonResponse,
  searchComparison,
  SearchComparisonProps,
} from "@app/api/comparisonAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useSearchComparison = ({ content, page }: SearchComparisonProps) =>
  useQuery<GetComparisonResponse>({
    queryKey: ["searchComparison", content, page],
    queryFn: () => searchComparison({ content, page }),
    placeholderData: keepPreviousData,
  });

export default useSearchComparison;
