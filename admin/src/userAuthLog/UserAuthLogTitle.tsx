import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { UserAuthLog } from "../api/userAuthLog/UserAuthLog";

type Props = { id: string };

export const UserAuthLogTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    UserAuthLog,
    AxiosError,
    [string, string]
  >(["get-/api/user-auth-logs", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/user-auth-logs"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/user-auth-logs"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
