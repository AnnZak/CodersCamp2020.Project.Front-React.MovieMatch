import React, { useState, useEffect } from 'react';
import './Login.scss';
import { loginUser, userSelector, clearState, UserCredentials } from '../../features/User/UserSlice'
import { Link, useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import TopLogo from '../../components/ui/topLogo/topLogo';
import Form from '../../components/layout/form/form';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isFetching, isError, isSuccess, errorMsg } = useAppSelector(
    userSelector
  );

  const onSubmit = (data: UserCredentials) => {
    dispatch(loginUser(data));
  }

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      //TODO handle errors
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      history.push('/');
    }
  }, [isError, isSuccess]);

  return (
    <div className="login">
      <TopLogo />
      <div className="login-container">
        <img className="login-container-picture" src="https://friendkit.cssninja.io/assets/img/illustrations/login/login.svg" />
        <div className="login-containers-form">
          <Form
            heading="Sign In to your account"
            inputs={[
              { type: 'email', label: 'Email:', placeholder: 'Enter your email address', value: email, setValue: setEmail },
              { type: 'password', label: 'Password:', placeholder: 'Enter your password', value: password, setValue: setPassword },
              { type: 'submit', value: 'Log in' }
            ]}
            onSubmit={() => { onSubmit({ email, password }) }}
          />
          <h5><Link to="register">Don't have an account? Sign Up</Link></h5>
        </div>
      </div>
    </div>
  );
}

export default Login;
