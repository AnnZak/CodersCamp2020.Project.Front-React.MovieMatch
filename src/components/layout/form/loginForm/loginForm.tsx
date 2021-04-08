import React from 'react';
import Form from '../form'

interface IProps {
  handleP?: Function | undefined;
  handleN?: Function | undefined;
}

const LoginForm = ({ handleP, handleN }: IProps) => {

    return (
      <Form
        heading="Sign In to your account"
        inputs={[
          { type: 'text', label: 'Email:', placeholder: 'email@example.com' },
          { type: 'password', label: 'Password:', placeholder: 'password' },
          { type: 'submit', value: 'Log in'}
        ]}
        formNavButtons={{ previous: false, next: false }}
        formNavFunctions={{ handleP, handleN }}
      />
    );
}

export default LoginForm;