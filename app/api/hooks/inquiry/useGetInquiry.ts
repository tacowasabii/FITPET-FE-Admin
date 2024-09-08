import {
  getInquiry,
  GetInquiryProps,
  GetInquiryResponse,
} from "@app/api/inquiryAPI";
import { useQuery } from "@tanstack/react-query";

const useGetInquiry = ({ startDate, endDate, status, page }: GetInquiryProps) =>
  useQuery<GetInquiryResponse>({
    queryKey: ["inquiry", startDate, endDate, status, page],
    queryFn: () => getInquiry({ startDate, endDate, status, page }),
  });

export default useGetInquiry;
