import getInquiry, { GetInquiryProps } from "@app/api/inquiryAPI";
import { useQuery } from "@tanstack/react-query";

const useGetInquiry = ({ startDate, endDate, status, page }: GetInquiryProps) =>
  useQuery({
    queryKey: ["inquiry", startDate, endDate, status, page],
    queryFn: () => getInquiry({ startDate, endDate, status, page }),
  });

export default useGetInquiry;
