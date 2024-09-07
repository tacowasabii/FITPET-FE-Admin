import tokenInstance from "./tokenInstance";

interface ReferSiteItem {
  refSiteId: number;
  channel: string;
  url: string;
  channelKor: string;
}

export interface GetReferSiteResponse {
  result: string;
  message: string;
  statusCode: number;
  data: {
    content: ReferSiteItem[];
    currentPage: number;
    numberOfElement: number;
    pageSize: number;
    totalElements: number;
    totalPage: number;
  };
}

export const getReferSites = async (
  page: number,
): Promise<GetReferSiteResponse> => {
  const response = await tokenInstance({
    url: "/refersite",
    method: "get",
    params: { page },
  });
  return response.data;
};

export interface CreateReferSiteData {
  channel: string;
  url: string;
  channelKor: string;
}

export const createReferSite = async (data: CreateReferSiteData) => {
  const response = await tokenInstance({
    url: "/refersite",
    method: "post",
    data,
  });
  return response.data;
};

export const deleteReferSite = async (referSiteId: number) => {
  const response = await tokenInstance({
    url: `/refersite/${referSiteId}`,
    method: "delete",
  });
  return response.data;
};
interface UpdateReferSiteData {
  channel: string;
  url: string;
  channelKor: string;
}

export interface UpdateReferSiteProps {
  referSiteId: number;
  data: UpdateReferSiteData;
}

export const updateReferSite = async ({
  referSiteId,
  data,
}: UpdateReferSiteProps) => {
  const response = await tokenInstance({
    url: `/refersite/${referSiteId}`,
    method: "patch",
    data,
  });
  return response.data;
};

export interface SearchReferSiteProps {
  content: string;
  page: number;
}

export const searchReferSite = async ({
  content,
  page,
}: SearchReferSiteProps): Promise<GetReferSiteResponse> => {
  const response = await tokenInstance({
    url: "/refersite/search",
    method: "get",
    params: { content, page },
  });
  return response.data;
};
