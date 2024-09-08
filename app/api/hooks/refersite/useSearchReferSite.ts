/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GetReferSiteResponse,
  searchReferSite,
  SearchReferSiteProps,
} from "@app/api/refersiteAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useSearchReferSite = (
  { content, page }: SearchReferSiteProps,
  options: any = {},
) =>
  useQuery<GetReferSiteResponse>({
    queryKey: ["refersiteSearch", content, page],
    queryFn: () => searchReferSite({ content, page }),
    placeholderData: keepPreviousData,
    ...options,
  });

export default useSearchReferSite;
