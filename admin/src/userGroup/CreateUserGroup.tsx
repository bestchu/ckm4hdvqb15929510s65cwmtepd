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
import { UserGroup } from "../api/userGroup/UserGroup";
import { UserGroupCreateInput } from "../api/userGroup/UserGroupCreateInput";

const INITIAL_VALUES = {} as UserGroupCreateInput;

export const CreateUserGroup = (): React.ReactElement => {
  useBreadcrumbs("/user-groups/new", "Create 用户分组");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    UserGroup,
    AxiosError,
    UserGroupCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/user-groups", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/user-groups"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: UserGroupCreateInput) => {
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
            <FormHeader title={"Create 用户分组"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <UserSelect label="manager" name="manager.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
