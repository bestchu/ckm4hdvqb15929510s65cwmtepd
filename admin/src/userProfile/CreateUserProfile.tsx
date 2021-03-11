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
import { UserProfile } from "../api/userProfile/UserProfile";
import { UserProfileCreateInput } from "../api/userProfile/UserProfileCreateInput";

const INITIAL_VALUES = {} as UserProfileCreateInput;

export const CreateUserProfile = (): React.ReactElement => {
  useBreadcrumbs("/user-profiles/new", "Create 用户信息表");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    UserProfile,
    AxiosError,
    UserProfileCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/user-profiles", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/user-profiles"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: UserProfileCreateInput) => {
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
            <FormHeader title={"Create 用户信息表"}>
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
