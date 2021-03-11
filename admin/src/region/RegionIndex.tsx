import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { RegionList } from "./RegionList";
import { CreateRegion } from "./CreateRegion";
import { Region } from "./Region";

export const RegionIndex = (): React.ReactElement => {
  useBreadcrumbs("/regions/", "Regions");

  return (
    <Switch>
      <PrivateRoute exact path={"/regions/"} component={RegionList} />
      <PrivateRoute path={"/regions/new"} component={CreateRegion} />
      <PrivateRoute path={"/regions/:id"} component={Region} />
    </Switch>
  );
};
