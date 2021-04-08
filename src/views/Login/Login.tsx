import React, { Fragment, useEffect } from 'react';
import './Login.scss';
// import LoginForm from '../../components/layout/form/loginForm/loginForm'; TODO: remove later
import TopLogo from '../../components/ui/topLogo/topLogo';
import { loginUser, userSelector, clearState } from '../../features/User/UserSlice'
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Form from '../../components/layout/form/form';

const Login = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const {register, handleSubmit } = useForm();
  const { isFetching, isError, isSuccess, errorMsg } = useSelector(
    userSelector
  );

  const onSubmit = (data: {login: string, password: string}) => { //todo: add interface or custom type
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
      history.push('/');
    }
  }, [isError, isSuccess]);

  return (
    // <div className="login">
    <>
      <TopLogo />
      <Form
        heading="Sign In to your account"
        inputs={[
          { type: 'text', label: 'Email:', placeholder: 'email@example.com' },
          { type: 'password', label: 'Password:', placeholder: 'password' },
          { type: 'submit', value: 'Log in'}
        ]}
      />
      <h5>or <Link to="register">Sign Up</Link></h5>

    </>

    // </div>
  );
}

export default Login;
