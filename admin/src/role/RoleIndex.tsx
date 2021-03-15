import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { RoleList } from "./RoleList";
import { CreateRole } from "./CreateRole";
import { Role } from "./Role";

export const RoleIndex = (): React.ReactElement => {
  useBreadcrumbs("/roles/", "Roles");

  return (
    <Switch>
      <PrivateRoute exact path={"/roles/"} component={RoleList} />
      <PrivateRoute path={"/roles/new"} component={CreateRole} />
      <PrivateRoute path={"/roles/:id"} component={Role} />
    </Switch>
  );
};
