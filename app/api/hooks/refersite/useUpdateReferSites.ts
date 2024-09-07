import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { updateReferSite, UpdateReferSiteProps } from "@app/api/refersiteAPI";

const useUpdateReferSite = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: ({ referSiteId, data }: UpdateReferSiteProps) =>
      updateReferSite({ referSiteId, data }),
    onSuccess: () => {
      toast({
        title: "유입 채널이 성공적으로 업데이트되었습니다.",
        status: "success",
        isClosable: true,
      });
    },
  });
};

export default useUpdateReferSite;
