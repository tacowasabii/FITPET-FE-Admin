/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetReferSiteResponse, getReferSites } from "@app/api/refersiteAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetRefersite = (page: number, options: any = {}) =>
  useQuery<GetReferSiteResponse>({
    queryKey: ["refersite", page],
    queryFn: () => getReferSites(page),
    placeholderData: keepPreviousData,
    ...options,
  });

export default useGetRefersite;
