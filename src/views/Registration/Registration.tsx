import React, { useState, useEffect } from 'react';
import './Registration.scss';
import Form from '../../components/layout/form/form';
import TopLogo from '../../components/ui/topLogo/topLogo';
import FakeNav from '../../components/ui/fakeNav/fakeNav';
import { RegisterCredentials, registerUser, clearState, userSelector } from '../../features/User/UserSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useHistory } from 'react-router-dom';

function Registration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [displayedName, setDisplayedName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isFetching, isError, isSuccess, errorMsg } = useAppSelector(
    userSelector
  );

  const onSubmit = (data: RegisterCredentials) => { //TODO: add interface or custom type
    dispatch(registerUser(data));
  }

  function handlePrevious() {
    if (currentStep === 1) return undefined;
    setCurrentStep(currentStep - 1);
    return undefined;
  }

  function handleNext() {
    if (currentStep === 3) return undefined;
    setCurrentStep(currentStep + 1);
    return undefined;
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
      history.push('/check-email'); // TODO
    }
  }, [isError, isSuccess]);

  return (
    <div className="registration">
      <TopLogo />
      {currentStep === 1 &&
        <Form
          heading="Welcome, tell us more about yourself!"
          inputs={[
            { type: 'text', label: 'First Name:', placeholder: 'Enter your first name', value: name, setValue: setName },
            { type: 'text', label: 'Displayed name:', placeholder: 'Enter your displayed name', value: displayedName, setValue: setDisplayedName },
            { type: 'email', label: 'Email:', placeholder: 'Enter your email address', value: email, setValue: setEmail },
          ]}
          formNavButtons={{ previous: false, next: true }}
          formNavFunctions={{ handlePrevious, handleNext }}
        />
      }
      {/* {currentStep === 2 &&
        <Form
          heading={'Upload a profile picture'}
          inputs={[
            { type: 'file', label: 'Choose an avatar:', attr: { accept: "image/png, image/jpeg" } },
          ]}
          formNavButtons={{ previous: true, next: true }}
          formNavFunctions={{ handlePrevious, handleNext }}
        />
      } */}
      {currentStep === 2 &&
        <Form
          heading={'Secure your account'}
          inputs={[
            { type: 'password', label: 'Password:', placeholder: 'Choose a password', value: password, setValue: setPassword },
            { type: 'password', label: 'Repeat password:', placeholder: 'Repeat password' },
          ]}
          formNavButtons={{ previous: true, next: true }}
          formNavFunctions={{ handlePrevious, handleNext }}
          info={`At least: 1 small letter, 1 big letter, 1 number & 1 special character.`}
        />
      }
      {currentStep === 3 &&
        <Form
          heading={"You're all set. Ready?"}
          inputs={[
            { type: 'submit', value: 'Register' }
          ]}
          formNavButtons={{ previous: true, next: false }}
          formNavFunctions={{ handlePrevious, handleNext }}
          info={`After registration go to your email to confirm.`}
          onSubmit={() => { onSubmit({ email, name, displayedName, password }) }}
        />
      }
    </div>
  );
}

export default Registration;
