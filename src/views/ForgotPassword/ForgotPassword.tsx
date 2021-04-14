import React, { useState } from 'react';
import './ForgotPassword.scss'
import Form from '../../components/layout/form/form';
import TopLogo from '../../components/ui/topLogo/topLogo';
import {forgotPassword} from '../../features/User/api'

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [emailWarning, setEmailWarning] = useState("");

    const onSubmit = (data: string) => {
        const emailRegEx = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/

        if(!emailRegEx.test(email)){
            setEmailWarning("(provide valid email)");
        } else {
            setEmailWarning("");
            forgotPassword(email);
        };
    }

    return (
        <div className="forgot-password">
            <TopLogo />
            <Form
                heading={'Please, provide your email'}
                inputs={[
                    { type: 'email', label: 'Email:', placeholder: 'e.g. geralt@kaermorhen.com', setValue: setEmail, paragraph: emailWarning },
                    { type: 'submit', value: 'Send email' }
                ]}
                onSubmit={() => { onSubmit(email) }}
                info={`You will receive email with link to reset your password. Make sure to provide the email you registered to MovieMatch with.`}
            />
        </div>
    );
}

export default ForgotPassword;
