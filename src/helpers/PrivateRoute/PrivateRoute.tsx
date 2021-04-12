import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from '../auth/auth';

const PrivateRoute: React.FC<{
    component: React.FunctionComponent<{ location?: { search?: string } }>;
    path: string;
    exact: boolean;
}> = (props) => {

    return getToken() ? (
        <Route path={props.path} exact={props.exact} component={props.component} />
    ) : (
        <Redirect to="/login" />
    );
};

export default PrivateRoute;