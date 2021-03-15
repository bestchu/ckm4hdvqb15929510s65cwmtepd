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
import { Application } from "../api/application/Application";
import { ApplicationCreateInput } from "../api/application/ApplicationCreateInput";

const INITIAL_VALUES = {} as ApplicationCreateInput;

export const CreateApplication = (): React.ReactElement => {
  useBreadcrumbs("/applications/new", "Create 应用表");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Application,
    AxiosError,
    ApplicationCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/applications", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/applications"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ApplicationCreateInput) => {
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
            <FormHeader title={"Create 应用表"}>
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
