import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Application } from "../api/application/Application";

type Data = Application[];

type Props = Omit<SelectFieldProps, "options">;

export const ApplicationSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/applications",
    async () => {
      const response = await api.get("/api/applications");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.id && item.id.length ? item.id : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
