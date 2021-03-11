import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserProfileList } from "./UserProfileList";
import { CreateUserProfile } from "./CreateUserProfile";
import { UserProfile } from "./UserProfile";

export const UserProfileIndex = (): React.ReactElement => {
  useBreadcrumbs("/user-profiles/", "UserProfiles");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/user-profiles/"}
        component={UserProfileList}
      />
      <PrivateRoute path={"/user-profiles/new"} component={CreateUserProfile} />
      <PrivateRoute path={"/user-profiles/:id"} component={UserProfile} />
    </Switch>
  );
};
