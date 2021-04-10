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
      history.push('/'); // TODO
    }
  }, [isError, isSuccess]);

  return (
    <div className="login">
      <TopLogo />
      <Form
        heading="Sign In to your account"
        inputs={[
          { type: 'email', label: 'Email:', placeholder: 'e.g. geralt@kaermorhen.com', value: email, setValue: setEmail },
          { type: 'password', label: 'Password:', placeholder: 'e.g. Rivia123*', value: password, setValue: setPassword },
          { type: 'submit', value: 'Log in' }
        ]}
        onSubmit={() => { onSubmit({ email, password }) }}
      />
      <h5>or <Link to="register">Sign Up</Link></h5>
    </div>
  );
}

export default Login;
