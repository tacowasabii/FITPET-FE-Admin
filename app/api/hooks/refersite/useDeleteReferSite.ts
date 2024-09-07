import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { deleteReferSite } from "@app/api/refersiteAPI";

const useDeleteReferSite = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (referSiteId: number) => deleteReferSite(referSiteId),
    onSuccess: () => {
      toast({
        title: "유입 채널이 성공적으로 삭제되었습니다.",
        status: "success",
        isClosable: true,
      });
    },
  });
};

export default useDeleteReferSite;
