import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Role } from "../api/role/Role";

type Props = { id: string };

export const RoleTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Role,
    AxiosError,
    [string, string]
  >(["get-/api/roles", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/roles"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/roles"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
