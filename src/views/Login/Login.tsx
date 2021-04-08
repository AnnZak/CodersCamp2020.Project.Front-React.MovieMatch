import React from 'react';
import './Login.scss';
import LoginForm from '../../components/layout/form/loginForm/loginForm';
import TopLogo from '../../components/ui/topLogo/topLogo';
import { Link } from 'react-router-dom';

function Login() {

  return (
    <div className="login">
      <TopLogo />
      <LoginForm />
      <h5>or <Link to="register">Sign Up</Link></h5>
    </div>
  );
}

export default Login;
