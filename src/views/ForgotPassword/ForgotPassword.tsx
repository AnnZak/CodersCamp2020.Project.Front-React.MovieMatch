import React, { useState } from 'react';
import './ForgotPassword.scss'
import Form from '../../components/layout/form/form';
import TopLogo from '../../components/ui/topLogo/topLogo';
import {forgotPassword} from '../../features/User/api'

function ForgotPassword() {

    const initialInfo = `You will receive email with link to reset your password. Make sure to provide the email you registered to MovieMatch with.`

    const [email, setEmail] = useState("");
    const [emailWarning, setEmailWarning] = useState("");
    const [info, setInfo] = useState(initialInfo);

    const onSubmit = async (data: string) => {
        const emailRegEx = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/

        if(!emailRegEx.test(email)){
            setEmailWarning("(provide valid email)");
        } else {
            setEmailWarning("");
            try {
                const response = await forgotPassword(email);
                if(response.status === 200) {
                    setInfo(response.data.message);
                } else {
                    setInfo(response.data.error);
                }
            } catch (error) {
                setInfo(error.response.data.error);
            }
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
                info={info}
            />
        </div>
    );
}

export default ForgotPassword;
