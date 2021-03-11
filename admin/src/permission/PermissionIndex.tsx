import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { PermissionList } from "./PermissionList";
import { CreatePermission } from "./CreatePermission";
import { Permission } from "./Permission";

export const PermissionIndex = (): React.ReactElement => {
  useBreadcrumbs("/permissions/", "Permissions");

  return (
    <Switch>
      <PrivateRoute exact path={"/permissions/"} component={PermissionList} />
      <PrivateRoute path={"/permissions/new"} component={CreatePermission} />
      <PrivateRoute path={"/permissions/:id"} component={Permission} />
    </Switch>
  );
};
