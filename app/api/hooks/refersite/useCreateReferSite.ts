import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { createReferSite, CreateReferSiteData } from "@app/api/refersiteAPI";

const useCreateReferSite = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReferSiteData) => createReferSite(data),
    onSuccess: () => {
      toast({
        title: "유입 채널이 성공적으로 생성되었습니다.",
        status: "success",
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ["refersite"] });
    },
  });
};

export default useCreateReferSite;
