import {
  GetReferSiteResponse,
  searchReferSite,
  SearchReferSiteProps,
} from "@app/api/refersiteAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useSearchReferSite = ({ content, page }: SearchReferSiteProps) =>
  useQuery<GetReferSiteResponse>({
    queryKey: ["refersiteSearch", content, page],
    queryFn: () => searchReferSite({ content, page }),
    placeholderData: keepPreviousData,
  });

export default useSearchReferSite;
