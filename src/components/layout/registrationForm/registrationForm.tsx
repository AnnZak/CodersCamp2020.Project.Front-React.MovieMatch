import React from 'react';
import Form from '../form/form';

interface IProps {
  step: Number;
  handleP?: Function | undefined;
  handleN?: Function | undefined;
}

const RegistrationForm = ({ step, handleP, handleN }: IProps) => {

  if (step === 1) {
    return (
      <Form
        heading="Welcome, tell us more about yourself!"
        inputs={[
          { type: 'text', label: 'First Name:', placeholder: 'e.g. Geralt' },
          { type: 'text', label: 'Displayed name:', placeholder: 'e.g. Gwynbleidd' },
          { type: 'email', label: 'Email:', placeholder: 'e.g. geralt@kaermorhen.com' },
        ]}
        formNavButtons={{ previous: false, next: true }}
        formNavFunctions={{ handleP, handleN }}
      />
    );
  }
  if (step === 2) {
    return (
      <Form
        heading={'Upload a profile picture'}
        inputs={[
          { type: 'file', label: 'Choose an avatar:', attr: { accept: "image/png, image/jpeg" } },
        ]}
        formNavButtons={{ previous: true, next: true }}
        formNavFunctions={{ handleP, handleN }}
      />
    );
  }
  if (step === 3) {
    return (
      <Form
        heading={'Set & repeat a new password'}
        inputs={[
          { type: 'password', label: 'Password:', placeholder: 'e.g. Rivia123*' },
          { type: 'password', label: 'Repeat password:', placeholder: 'e.g. Rivia123*' },
          { type: 'submit', value: 'Register' }
        ]}
        formNavButtons={{ previous: true, next: false }}
        formNavFunctions={{ handleP, handleN }}
        info={`At least: 1 small letter, 1 big letter, 1 number & 1 special character.`}
      />
    );
  }

  return null;
}

export default RegistrationForm;

