import { httpClient } from "@/core/api/fetch-api";
import {
  DefaultPagination,
  PaginatedResponse,
} from "@/shared/model/pagination.model.jsx";
import { mountQuery } from "@/shared/utils/mount-query";
import { useQuery } from "@tanstack/react-query";
import { surveyApi } from "../api";
import { SurveyResponseModel } from "../model/survey-response";

export const GetSurveyResponsesQuery = ({
  surveyId,
  companyId,
  pagination,
}: {
  pagination: DefaultPagination;
  surveyId: string;
  companyId?: string;
}) => {
  const queryKey = ["survey-details", surveyId, pagination?.page];

  return useQuery({
    queryKey,
    enabled: !!surveyId && !!companyId,
    queryFn: async () => {
      const url = surveyApi.GET_SURVEY_RESPONSES.replace(
        ":companyId",
        companyId || ""
      ).replace(":surveyId", surveyId);

      const formattedUrl = `${url}?${mountQuery(pagination)}`;

      const response = await httpClient.request<
        PaginatedResponse<SurveyResponseModel>
      >({
        method: "GET",
        url: formattedUrl,
      });
      return response.data;
    },
    retry: 1,
  });
};
