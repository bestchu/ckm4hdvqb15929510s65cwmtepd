import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserAuthLogList } from "./UserAuthLogList";
import { CreateUserAuthLog } from "./CreateUserAuthLog";
import { UserAuthLog } from "./UserAuthLog";

export const UserAuthLogIndex = (): React.ReactElement => {
  useBreadcrumbs("/user-auth-logs/", "UserAuthLogs");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/user-auth-logs/"}
        component={UserAuthLogList}
      />
      <PrivateRoute
        path={"/user-auth-logs/new"}
        component={CreateUserAuthLog}
      />
      <PrivateRoute path={"/user-auth-logs/:id"} component={UserAuthLog} />
    </Switch>
  );
};
