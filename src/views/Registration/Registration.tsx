import React, { useState, useEffect } from 'react';
import './Registration.scss';
import Form from '../../components/layout/form/form';
import TopLogo from '../../components/ui/topLogo/topLogo';
import { RegisterCredentials, registerUser, clearState, userSelector } from '../../features/User';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useHistory } from 'react-router-dom';

function Registration() {
  const [currentStep, setCurrentStep] = useState(1);

  const [name, setName] = useState("");
  const [displayedName, setDisplayedName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [nameWarning, setNameWarning] = useState("");
  const [displayedNameWarning, setDisplayedNameWarning] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [repeatPasswordWarning, setRepeatPasswordWarning] = useState("");

  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isError, isSuccess } = useAppSelector(
    userSelector
  );

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

  const onSubmit = (data: RegisterCredentials) => {
    dispatch(registerUser(data));
  }

  function handlePrevious() {
    if (currentStep === 1) return undefined;
    setCurrentStep(currentStep - 1);
    return undefined;
  }

  function handleNext() {
    setNameWarning("");
    setDisplayedNameWarning("");
    setEmailWarning("");
    setPasswordWarning("");
    setRepeatPasswordWarning("");
    const emailRegEx = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
    const pwRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;

    if (currentStep === 1) {

      if (name.length < 2 || name.length > 20) {
        setCurrentStep(currentStep);
        setNameWarning("(should be of min. 2 & max. 20 characters)");
      }
      if (displayedName.length < 2 || displayedName.length > 20) {
        setCurrentStep(currentStep);
        setDisplayedNameWarning("(should be of min. 2 & max. 20 characters)");
      }
      if (!emailRegEx.test(email)) {
        setCurrentStep(currentStep);
        setEmailWarning("(provide valid email)");
      }
      if (name.length > 1 && name.length < 20 && displayedName.length > 1 && displayedName.length < 20 && emailRegEx.test(email)) {
        setCurrentStep(currentStep + 1);
      }
    }

    if (currentStep === 2) {

      if (!pwRegEx.test(password)) {
        setCurrentStep(currentStep);
        setPasswordWarning("(min. 8 & max. 20 characters; at least 1 small letter, 1 capital letter, 1 digit & 1 special character)");
      }

      if (repeatPassword !== password) {
        setCurrentStep(currentStep);
        setRepeatPasswordWarning("(passwords are not identical)");
      }

      if (pwRegEx.test(password) && repeatPassword === password) {
        setCurrentStep(currentStep + 1);
      }
    }

    if (currentStep === 3) return undefined;
    return;
  }

  return (
    <div className="registration">
      <TopLogo />
      {currentStep === 1 &&
        <Form
          heading="Welcome, tell us more about yourself!"
          inputs={[
            { type: 'text', label: 'First Name:', placeholder: 'Enter your first name', value: name, setValue: setName, paragraph: nameWarning },
            { type: 'text', label: 'Displayed name:', placeholder: 'Enter your displayed name', value: displayedName, setValue: setDisplayedName, paragraph: displayedNameWarning },
            { type: 'email', label: 'Email:', placeholder: 'Enter your email address', value: email, setValue: setEmail, paragraph: emailWarning },
          ]}
          formNavButtons={{ previous: false, next: true }}
          formNavFunctions={{ handlePrevious, handleNext }}
        />
      }
      {currentStep === 2 &&
        <Form
          heading={'Secure your account'}
          inputs={[
            { type: 'password', label: 'Password:', placeholder: 'Choose a password', value: password, setValue: setPassword, paragraph: passwordWarning },
            { type: 'password', label: 'Repeat password:', placeholder: 'Repeat password', value: repeatPassword, setValue: setRepeatPassword, paragraph: repeatPasswordWarning },
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
