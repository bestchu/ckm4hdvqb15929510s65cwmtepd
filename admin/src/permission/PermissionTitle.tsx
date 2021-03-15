import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Permission } from "../api/permission/Permission";

type Props = { id: string };

export const PermissionTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Permission,
    AxiosError,
    [string, string]
  >(["get-/api/permissions", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/permissions"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/permissions"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
