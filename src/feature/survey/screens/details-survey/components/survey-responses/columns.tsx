import { SurveyResponseModel } from "@/feature/survey/model/survey-response";
import { ColumnDef } from "@tanstack/react-table";
import { SecondsToHoursMinutesSeconds } from "../../../../../../shared/utils/seconds-to-hh-mm-ss";

export const responseColumns: ColumnDef<SurveyResponseModel>[] = [
  { accessorKey: "id", header: "Id" },
  {
    accessorKey: "sourceLinkId",
    header: "Link",
    cell: ({ row }) => {
      return row.original.sourceLink
        ? row.original.sourceLink.name
        : row.original.sourceLinkId;
    },
  },
  {
    accessorKey: "timeToSubmitSeconds",
    header: "Tempo de Resposta",
    cell: ({ row }) =>
      SecondsToHoursMinutesSeconds(row.original.timeToSubmitSeconds ?? 0),
  },
  {
    accessorKey: "submittedAt",
    header: "Data de Envio",
    cell: ({ row }) =>
      new Date(row.original.submittedAt).toLocaleString("pt-BR"),
  },
];
