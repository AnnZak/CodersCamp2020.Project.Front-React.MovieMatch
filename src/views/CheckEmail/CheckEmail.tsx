import React from 'react';
import './CheckEmail.scss';
import TopLogo from '../../components/ui/topLogo/topLogo';

function ResetPassword() {

    return (
        <div className="forgot-password">
            <TopLogo />
            <img src="https://friendkit.cssninja.io/assets/img/illustrations/signup/mailbox.svg" alt="mailbox" />
            <h1 className='check-heading'>Please, check you email to confirm registration</h1>
        </div>
    );
}

export default ResetPassword;
