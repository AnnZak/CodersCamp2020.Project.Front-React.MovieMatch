import React, {useState} from 'react';
import './Registration.scss';
import RegistrationForm from '../../components/layout/registrationForm/registrationForm';

function Registration() {
  const [currentStep, setCurrentStep] = useState(1);
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

  return (
    <div className="registration">
      <RegistrationForm step={currentStep}/>
      <button onClick={() => handlePrevious()}>
        Previous
      </button>
      <button onClick={() => handleNext()}>
        Next
      </button>
    </div>
  );
}

export default Registration;
