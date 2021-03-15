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
import { ApplicationSelect } from "../application/ApplicationSelect";
import { Role } from "../api/role/Role";
import { RoleCreateInput } from "../api/role/RoleCreateInput";

const INITIAL_VALUES = {} as RoleCreateInput;

export const CreateRole = (): React.ReactElement => {
  useBreadcrumbs("/roles/new", "Create 应用角色表");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Role,
    AxiosError,
    RoleCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/roles", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/roles"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: RoleCreateInput) => {
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
            <FormHeader title={"Create 应用角色表"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <ApplicationSelect label="app" name="app.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
