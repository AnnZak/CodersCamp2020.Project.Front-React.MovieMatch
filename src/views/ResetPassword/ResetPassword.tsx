import React from 'react';
import Form from '../../components/layout/form/form';
import './ResetPassword.scss'
import TopLogo from '../../components/ui/topLogo/topLogo';

function ResetPassword() {

    return (
        <div className="forgot-password">
            <TopLogo />
            <Form
                heading={'Reset password'}
                inputs={[
                    { type: 'password', label: 'New password:', placeholder: 'e.g. Rivia123*' },
                    { type: 'password', label: 'Repeat new password:', placeholder: 'e.g. Rivia123*' },
                    { type: 'submit', value: 'Reset' }
                ]}
                info={`The password you set below will be your new password to MovieMatch. Choose a password which contains: at least - 1 small letter, 1 big letter, 1 number & 1 special character.`}
            />
        </div>
    );
}

export default ResetPassword;
