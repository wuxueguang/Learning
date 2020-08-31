import React from "react";
import { Route, RouteProps, Redirect } from "react-router";
import { UserState } from "@/reducers/user";
import { connect } from "react-redux";

interface ReduxProps {
  User: UserState;
}

interface ProtectedRoute {
  props: ReduxProps & RouteProps;
}

class ProtectedRoute extends React.Component<RouteProps> {
  render() {
    const {
      User,
      component,
      location,
      children,
      path,
      exact,
      sensitive,
      strict
    } = this.props;

    const authorized = !!User.token;

    return React.createElement(Route, {
      ...{ location, children, path, exact, sensitive, strict },
      render: (props: any) =>
        authorized
          ? React.createElement(component!, { ...props })
          : React.createElement(Redirect, {
              to: {
                pathname: "/signin",
                state: { from: props.location }
              }
            })
    });
  }
}

export default connect<{}, {}, {}, { User: UserState }>(({ User }) => ({
  User
}))(ProtectedRoute);
