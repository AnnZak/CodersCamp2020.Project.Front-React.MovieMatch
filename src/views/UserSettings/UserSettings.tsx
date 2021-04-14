import React, { useState } from 'react';

import './UserSettings.scss';
import Form from '../../components/layout/form/form';
import Topbar from '../../components/layout/topbar/topbar';
import { userSelector, userApi, changeData } from '../../features/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

function UserSettings() {

    const emailRegEx = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
    const pwRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;

    const [newName, setNewName] = useState<string>("");
    const [newDispName, setNewDispName] = useState<string>("");
    const [newEmail, setNewEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [passConf, setPassConf] = useState<string>("");

    const [submittedName, setSubmittedName] = useState<string>("");
    const [submittedDispName, setSubmittedDispName] = useState<string>("");
    const [submittedEmail, setSubmittedEmail] = useState<string>("");
    const [submittedPassword, setSubmittedPassword] = useState<string>("");

    const [nameWarning, setNameWarning] = useState("");
    const [displayedNameWarning, setDisplayedNameWarning] = useState("");
    const [emailWarning, setEmailWarning] = useState("");
    const [passwordWarning, setPasswordWarning] = useState("");
    const [repeatPasswordWarning, setRepeatPasswordWarning] = useState("");

    const dispatch = useAppDispatch();
    const { _id, name, displayedName, email } = useAppSelector(userSelector);

    const handleNameSubmit: Function = () => {
        if (newName.length < 2 || newName.length > 20) {
            setNameWarning("(should be of min. 2 & max. 20 characters)");
        } else {
            setNameWarning("");
            dispatch(changeData({ id: _id, toChange: { name: newName } }));
            setSubmittedName(`Your name has been changed to: ${newName}`);
        }
    }
    const handleDispNameSubmit: Function = () => {
        if (newDispName.length < 2 || newDispName.length > 20) {
            setDisplayedNameWarning("(should be of min. 2 & max. 20 characters)");
        } else {
            setDisplayedNameWarning("");
            dispatch(changeData({ id: _id, toChange: { displayedName: newDispName } }));
            setSubmittedDispName(`Your displayed name has been changed to: ${newDispName}`);
        }
    }
    const handleEmailSubmit: Function = () => {
        if (!emailRegEx.test(newEmail)) {
            setEmailWarning("(provide valid email)");
        } else {
            setEmailWarning("");
            dispatch(changeData({ id: _id, toChange: { email: newEmail } }));
            setSubmittedEmail(`Your email has been changed to: ${newEmail}`);
        }
    }
    const handlePasswordSubmit: Function = () => {

        if (!pwRegEx.test(pass)) {
            setPasswordWarning("(min. 8 & max. 20 characters; at least 1 small letter, 1 capital letter, 1 digit & 1 special character)");
        } else { setPasswordWarning(""); }
        if (pass !== passConf) {
            setRepeatPasswordWarning("(passwords are not identical)");
        } else { setRepeatPasswordWarning(""); }

        if (pwRegEx.test(pass) && passConf === pass) {
            // dispatch(changeData({ id: _id, toChange: { name: newName } }));
            setSubmittedPassword("Your password has been changed");
        }
    }

    return (
        <div className="user-settings">
            <Topbar />
            <Form
                heading={'Account settings'}
                info={`Below you can change your account settings:`}
                inputs={[
                    { type: 'text', label: `Name:`, placeholder: name, value: newName, setValue: setNewName, paragraphAfter: submittedName, paragraph: nameWarning },
                    { type: 'button', value: 'Change name', onClick: handleNameSubmit },
                    { type: 'text', label: `Displayed name:`, placeholder: displayedName, value: newDispName, setValue: setNewDispName, paragraphAfter: submittedDispName, paragraph: displayedNameWarning },
                    { type: 'button', value: 'Change displayed name', onClick: handleDispNameSubmit },
                    { type: 'email', label: `email:`, placeholder: email, value: newEmail, setValue: setNewEmail, paragraphAfter: submittedEmail, paragraph: emailWarning },
                    { type: 'button', value: 'Change account email', onClick: handleEmailSubmit },
                    { type: 'password', label: 'New password:', placeholder: 'Your Secret Password', value: pass, setValue: setPass, paragraph: passwordWarning },
                    { type: 'password', label: 'Confirm new password:', placeholder: 'Confirm New Secret Password', value: passConf, setValue: setPassConf, paragraphAfter: submittedPassword, paragraph: repeatPasswordWarning },
                    { type: 'button', value: 'Change password', onClick: handlePasswordSubmit },
                ]}
            />
        </div>
    );
}

export default UserSettings;
