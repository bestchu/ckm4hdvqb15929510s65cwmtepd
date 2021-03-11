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
import { UserSelect } from "../user/UserSelect";
import { UserAuthLog } from "../api/userAuthLog/UserAuthLog";
import { UserAuthLogCreateInput } from "../api/userAuthLog/UserAuthLogCreateInput";

const INITIAL_VALUES = {} as UserAuthLogCreateInput;

export const CreateUserAuthLog = (): React.ReactElement => {
  useBreadcrumbs("/user-auth-logs/new", "Create 用户授权日志表");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    UserAuthLog,
    AxiosError,
    UserAuthLogCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/user-auth-logs", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/user-auth-logs"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: UserAuthLogCreateInput) => {
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
            <FormHeader title={"Create 用户授权日志表"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <UserSelect label="user" name="user.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
