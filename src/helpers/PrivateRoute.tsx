import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute: React.FC<{
    component: React.FunctionComponent<{ location?: { search?: string } }>;
    path: string;
    exact: boolean;
}> = (props) => {

    return localStorage.getItem('authorization') ? (
        <Route path={props.path} exact={props.exact} component={props.component} />
    ) : (
        <Redirect to="/login" />
    );
};

export default PrivateRoute;