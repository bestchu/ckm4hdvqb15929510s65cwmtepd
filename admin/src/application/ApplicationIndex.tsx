import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ApplicationList } from "./ApplicationList";
import { CreateApplication } from "./CreateApplication";
import { Application } from "./Application";

export const ApplicationIndex = (): React.ReactElement => {
  useBreadcrumbs("/applications/", "Applications");

  return (
    <Switch>
      <PrivateRoute exact path={"/applications/"} component={ApplicationList} />
      <PrivateRoute path={"/applications/new"} component={CreateApplication} />
      <PrivateRoute path={"/applications/:id"} component={Application} />
    </Switch>
  );
};
