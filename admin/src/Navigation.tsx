import React from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, EnumPanelStyle } from "@amplication/design-system";

const Navigation = (): React.ReactElement => {
  return (
    <>
      <NavigationItem name="Users" to="/users" />
      <NavigationItem name="UserProfiles" to="/user-profiles" />
      <NavigationItem name="Regions" to="/regions" />
      <NavigationItem name="Applications" to="/applications" />
      <NavigationItem name="UserGroups" to="/user-groups" />
      <NavigationItem name="Permissions" to="/permissions" />
      <NavigationItem name="Roles" to="/roles" />
      <NavigationItem name="UserAuthLogs" to="/user-auth-logs" />
    </>
  );
};

export default Navigation;

const NavigationItem = ({
  to,
  name,
}: {
  to: string;
  name: string;
}): React.ReactElement => (
  <Link to={to}>
    <Panel panelStyle={EnumPanelStyle.Bordered}>
      <PanelHeader>{name}</PanelHeader>
      Create, update, search and delete {name}
    </Panel>
  </Link>
);
