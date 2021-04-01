import React from 'react';
import './registrationForm.scss';

interface IProps {
  step: Number;
}

const RegistrationForm = ({step} : IProps) => {
  
  if (step === 1) { // Prop: The current step
    return (
      <>
        <h1>Welcome, tell us more about you.</h1> 
        <div className="registration-form-panel">
        <div className="registration-form-panel-field">
          <label>Name
            <div className="input-div">
              <input type="text" className="input" placeholder="Enter your first name"></input>
            </div>
          </label>
        </div>
        <div className="registration-form-panel-field">
          <label>Displayed Name
            <div className="input-div">
              <input type="text" className="input" placeholder="Enter your first name"></input>
            </div>
          </label>
        </div>
        <div className="registration-form-panel-field">
        <label>Email
          <div className="input-div">
            <input type="text" className="input" placeholder="Enter your first name"></input>
          </div>
        </label>
        </div>
      </div>
      </>
    );
  }
  if (step === 2) { // Prop: The current step
    return (
      <>
        <h1>Upload a profile picture.</h1> 
        <div className="registration-form-panel">
          <label>Choose avatar
            <div className="input-div">
              <input type="file" className="input input-file" name="avatar" accept="image/png, image/jpeg"></input>
            </div>
          </label>
      </div>
      </>
    );
  }
  if (step === 3) { // Prop: The current step
    return (
      <>
        <h1>Set password.</h1> 
        <div className="registration-form-panel">
        <div className="registration-form-panel-field">
          <label>Password
            <div className="input-div">
              <input type="text" className="input" placeholder="Choose a password"></input>
            </div>
          </label>
        </div>
        <div className="registration-form-panel-field">
          <label>Repeat password
            <div className="input-div">
              <input type="text" className="input" placeholder="Repeat password"></input>
            </div>
          </label>
        </div>
      </div>
      </>
    );
  }
  
  return null;
}

export default RegistrationForm; 

