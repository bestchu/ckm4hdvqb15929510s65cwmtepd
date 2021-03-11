import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Application } from "../api/application/Application";

type Props = { id: string };

export const ApplicationTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Application,
    AxiosError,
    [string, string]
  >(["get-/api/applications", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/applications"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/applications"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
