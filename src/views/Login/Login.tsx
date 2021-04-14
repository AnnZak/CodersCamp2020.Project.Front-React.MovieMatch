import React, { useState, useEffect } from 'react';
import './Login.scss';
import { loginUser, userSelector, clearState, LoginCredentials } from '../../features/User'
import { Link, useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import TopLogo from '../../components/ui/topLogo/topLogo';
import Form from '../../components/layout/form/form';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [wrongCredentials, setWrongCredentials] = useState("");

  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isFetching, isError, isSuccess, errorMsg } = useAppSelector(
    userSelector
  );

  const onSubmit = (data: LoginCredentials) => {
    const emailRegEx = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
    setWrongCredentials("");

    if (!emailRegEx.test(email)) {
      setEmailWarning("(provide valid email)");
    } else setEmailWarning("");

    if (password.length < 7) {
      setPasswordWarning("(provide valid password)");
    } else setPasswordWarning("");

    if (emailRegEx.test(email) && password.length >= 7) {
      dispatch(loginUser(data));
    }
  }

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      //TODO handle errors
      setWrongCredentials("! Wrong email or password !");
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
              { type: 'email', label: 'Email:', placeholder: 'Enter your email address', value: email, setValue: setEmail, paragraph: emailWarning },
              { type: 'password', label: 'Password:', placeholder: 'Enter your password', value: password, setValue: setPassword, paragraph: passwordWarning },
              { type: 'submit', value: 'Log in', paragraph: wrongCredentials }
            ]}
            onSubmit={() => { onSubmit({ email, password }) }}
          />
          <h5><Link to="register">Don't have an account? Sign Up</Link></h5>
          <h6><Link to ="/forgot-password">Forgot Password?</Link></h6>
        </div>
      </div>
    </div>
  );
}

export default Login;
