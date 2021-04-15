import React, { useState } from 'react';
import Form from '../../components/layout/form/form';
import './ResetPassword.scss'
import TopLogo from '../../components/ui/topLogo/topLogo';
import { useParams } from 'react-router';
import { userApi } from '../../features/User'

function ResetPassword() {

    const { resetToken } = useParams<{resetToken: string}>();
    const pwRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;

    const [password, setPassword] = useState("");
    const [passwordWarning, setPasswordWarning] = useState("");

    const [repeatPassword, setRepeatPassword] = useState("");
    const [repeatPasswordWarning, setRepeatPasswordWarning] = useState("");

    const [submitInfo, setSubmitInfo] = useState("");


    const onSubmit = async (password: string) => {
        setPasswordWarning("");
        setRepeatPasswordWarning("");
        setSubmitInfo("");

        if (!pwRegEx.test(password)) {
            setPasswordWarning("(min. 8 & max. 20 characters; at least 1 small letter, 1 capital letter, 1 digit & 1 special character)");
        }

        if (repeatPassword !== password) {
            setRepeatPasswordWarning("(passwords are not identical)");
        }

        if (pwRegEx.test(password) && repeatPassword === password) {
            
            try {
                const response = await userApi.resetPassword(password, resetToken);
                if(response.status === 200) {
                    setSubmitInfo(response.data.message);
                } else {
                    setSubmitInfo(response.data.error);
                }
            } catch (error) {
                setSubmitInfo(error.response.data.error);
            }
        }
    }


    return (
        <div className="forgot-password">
            <TopLogo />
            <Form
                heading={'Reset password'}
                inputs={[
                    { type: 'password', label: 'New password:', placeholder: 'e.g. Rivia123*', value: password, setValue: setPassword, paragraph: passwordWarning },
                    { type: 'password', label: 'Repeat new password:', placeholder: 'e.g. Rivia123*', value: repeatPassword, setValue: setRepeatPassword, paragraph: repeatPasswordWarning },
                    { type: 'submit', value: 'Reset', paragraphAfter: submitInfo }
                ]}
                info={`The password you set below will be your new password to MovieMatch. Choose a password which contains: at least - 1 small letter, 1 big letter, 1 number & 1 special character.`}
                onSubmit={() => {onSubmit(password)}}
            />
        </div>
    );
}

export default ResetPassword;
