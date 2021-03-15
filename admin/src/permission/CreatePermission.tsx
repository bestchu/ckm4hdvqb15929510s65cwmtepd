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
import { Permission } from "../api/permission/Permission";
import { PermissionCreateInput } from "../api/permission/PermissionCreateInput";

const INITIAL_VALUES = {} as PermissionCreateInput;

export const CreatePermission = (): React.ReactElement => {
  useBreadcrumbs("/permissions/new", "Create 应用权限表");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Permission,
    AxiosError,
    PermissionCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/permissions", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/permissions"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: PermissionCreateInput) => {
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
            <FormHeader title={"Create 应用权限表"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <ApplicationSelect label="应用" name="app.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
