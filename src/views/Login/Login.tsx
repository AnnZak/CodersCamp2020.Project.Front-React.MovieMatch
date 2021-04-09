import React, { useEffect } from 'react';
import './Login.scss';
import { loginUser, userSelector, clearState } from '../../features/User/UserSlice'
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form'; //TODO
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import TopLogo from '../../components/ui/topLogo/topLogo';
import Form from '../../components/layout/form/form';

const Login = () => {

  const dispatch = useAppDispatch();
  const history = useHistory();
  // const {register, handleSubmit } = useForm();
  const { isFetching, isError, isSuccess, errorMsg } = useAppSelector(
    userSelector
  );

  const onSubmit = (data: {login: string, password: string}) => { //TODO: add interface or custom type
    dispatch(loginUser(data));
  }

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(errorMsg);
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      history.push('/'); // TODO ??
    }
  }, [isError, isSuccess]);

  return (
    <div className="login">
      <TopLogo />
      <Form
        heading="Sign In to your account"
        inputs={[
          { type: 'text', label: 'Email:', placeholder: 'email@example.com' },
          { type: 'password', label: 'Password:', placeholder: 'password' },
          { type: 'submit', value: 'Log in'}
        ]}
        onSubmit={onSubmit}
      />
      <h5>or <Link to="register">Sign Up</Link></h5>
    </div>
  );
}

export default Login;
