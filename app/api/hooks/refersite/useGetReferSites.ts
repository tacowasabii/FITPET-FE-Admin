import { GetReferSiteResponse, getReferSites } from "@app/api/refersiteAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetRefersite = (page: number) =>
  useQuery<GetReferSiteResponse>({
    queryKey: ["refersite", page],
    queryFn: () => getReferSites(page),
    placeholderData: keepPreviousData,
  });

export default useGetRefersite;
