import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { UserProfile } from "../api/userProfile/UserProfile";

type Props = { id: string };

export const UserProfileTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    UserProfile,
    AxiosError,
    [string, string]
  >(["get-/api/user-profiles", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/user-profiles"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/user-profiles"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
