import React from 'react';
import Form from '../../components/layout/form/form';
import './ForgotPassword.scss'
import TopLogo from '../../components/ui/topLogo/topLogo';

function ForgotPassword() {

    return (
        <div className="forgot-password">
            <TopLogo />
            <Form
                heading={'Please, provide your email'}
                inputs={[
                    { type: 'email', label: 'Email:', placeholder: 'e.g. geralt@kaermorhen.com' },
                    { type: 'submit', value: 'Send email' }
                ]}
                info={`You will receive email with link to reset your password. Make sure to provide the email you registered to MovieMatch with.`}
            />
        </div>
    );
}

export default ForgotPassword;
