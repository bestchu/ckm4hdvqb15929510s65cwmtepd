import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserGroupList } from "./UserGroupList";
import { CreateUserGroup } from "./CreateUserGroup";
import { UserGroup } from "./UserGroup";

export const UserGroupIndex = (): React.ReactElement => {
  useBreadcrumbs("/user-groups/", "UserGroups");

  return (
    <Switch>
      <PrivateRoute exact path={"/user-groups/"} component={UserGroupList} />
      <PrivateRoute path={"/user-groups/new"} component={CreateUserGroup} />
      <PrivateRoute path={"/user-groups/:id"} component={UserGroup} />
    </Switch>
  );
};
