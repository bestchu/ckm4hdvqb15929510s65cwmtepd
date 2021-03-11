import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { UserGroup } from "../api/userGroup/UserGroup";

type Props = { id: string };

export const UserGroupTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    UserGroup,
    AxiosError,
    [string, string]
  >(["get-/api/user-groups", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/user-groups"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/user-groups"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
