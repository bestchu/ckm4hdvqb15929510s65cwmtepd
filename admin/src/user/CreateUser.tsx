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
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { User } from "../api/user/User";
import { UserCreateInput } from "../api/user/UserCreateInput";
import { RoleSelect } from "../user/RoleSelect";

const INITIAL_VALUES = {} as UserCreateInput;

export const CreateUser = (): React.ReactElement => {
  useBreadcrumbs("/users/new", "Create 用户表");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    User,
    AxiosError,
    UserCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/users", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/users"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: UserCreateInput) => {
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
            <FormHeader title={"Create 用户表"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField type="password" label="Password" name="password" />
          </div>
          <div>
            <RoleSelect label="Roles" name="roles" />
          </div>
          <div>
            <TextField label="Username" name="username" />
          </div>
          <div>
            <TextField label="名字" name="name" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
