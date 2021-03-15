import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Region } from "../api/region/Region";
import { RegionCreateInput } from "../api/region/RegionCreateInput";

const INITIAL_VALUES = {} as RegionCreateInput;

export const CreateRegion = (): React.ReactElement => {
  useBreadcrumbs("/regions/new", "Create 地区表");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Region,
    AxiosError,
    RegionCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/regions", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/regions"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: RegionCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create 地区表"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        ></Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
