import React, { useCallback, useContext } from "react";
import { Route, Switch, useHistory, Link, NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import Login from "./Login";
import { Credentials, setCredentials, removeCredentials } from "./auth";
import {
  Menu,
  MainLayout,
  Page,
  CircleBadge,
  Breadcrumbs,
} from "@amplication/design-system";
import BreadcrumbsContext from "./components/breadcrumbs/BreadcrumbsContext";
import BreadcrumbsProvider from "./components/breadcrumbs/BreadcrumbsProvider";
import useBreadcrumbs from "./components/breadcrumbs/use-breadcrumbs";
import PrivateRoute from "./components/PrivateRoute";
import { UserIndex } from "./user/UserIndex";
import { UserProfileIndex } from "./userProfile/UserProfileIndex";
import { RegionIndex } from "./region/RegionIndex";
import { ApplicationIndex } from "./application/ApplicationIndex";
import { UserGroupIndex } from "./userGroup/UserGroupIndex";
import { PermissionIndex } from "./permission/PermissionIndex";
import { RoleIndex } from "./role/RoleIndex";
import { UserAuthLogIndex } from "./userAuthLog/UserAuthLogIndex";

const App = (): React.ReactElement => {
  const history = useHistory();
  const handleLogin = useCallback(
    (credentials: Credentials) => {
      setCredentials(credentials);
      history.push("/");
    },
    [history]
  );

  return (
    <BreadcrumbsProvider>
      <MainLayout>
        <Switch>
          <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
          <PrivateRoute path="/" component={AppLayout} />
        </Switch>
      </MainLayout>
    </BreadcrumbsProvider>
  );
};

export default App;

/**@todo: move to a separate template file */
const AppLayout = (): React.ReactElement => {
  const history = useHistory();
  useBreadcrumbs("/", "necho");
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const signOut = useCallback(() => {
    removeCredentials();
    history.push("/login");
  }, [history]);

  // Use navLink for breadcrumbs to prevent page reload
  const ItemLink = ({ href, ...rest }: { href: string }) => (
    <NavLink {...rest} to={href} />
  );

  return (
    <>
      <Menu
        onSignOutClick={signOut}
        logoContent={
          <Link to="/">
            <CircleBadge name={"necho"} />
          </Link>
        }
      ></Menu>
      <MainLayout.Content>
        <Breadcrumbs>
          {}
          {breadcrumbsContext.breadcrumbsItems.map((item, index, items) => (
            <Breadcrumbs.Item
              as={ItemLink}
              key={index}
              selected={index + 1 === items.length}
              href={item.url}
            >
              {item.name}
            </Breadcrumbs.Item>
          ))}
        </Breadcrumbs>
        <Page>
          <Switch>
            <PrivateRoute exact path="/" component={Navigation} />
            <PrivateRoute path="/users" component={UserIndex} />
            <PrivateRoute path="/user-profiles" component={UserProfileIndex} />
            <PrivateRoute path="/regions" component={RegionIndex} />
            <PrivateRoute path="/applications" component={ApplicationIndex} />
            <PrivateRoute path="/user-groups" component={UserGroupIndex} />
            <PrivateRoute path="/permissions" component={PermissionIndex} />
            <PrivateRoute path="/roles" component={RoleIndex} />
            <PrivateRoute path="/user-auth-logs" component={UserAuthLogIndex} />
          </Switch>
        </Page>
      </MainLayout.Content>
    </>
  );
};
