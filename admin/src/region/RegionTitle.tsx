import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Region } from "../api/region/Region";

type Props = { id: string };

export const RegionTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Region,
    AxiosError,
    [string, string]
  >(["get-/api/regions", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/regions"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/regions"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
