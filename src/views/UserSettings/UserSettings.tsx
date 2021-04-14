import React from 'react';
import './UserSettings.scss'
import Form from '../../components/layout/form/form';
import Topbar from '../../components/layout/topbar/topbar';

function UserSettings() {

    return (
        <div className="user-settings">
            <Topbar />
            <Form
                heading={'Account settings'}
                info={`Below you can change your account settings:`}
                inputs={[
                    { type: 'text', label: 'Change displayed name:', placeholder: 'e.g. Gwynbleidd' },
                    { type: 'email', label: 'Change account email:', placeholder: 'e.g. geralt@kaermorhen.com' },
                    { type: 'password', label: 'Change password:', placeholder: 'e.g. Rivia123*' },
                    { type: 'submit', value: 'Apply changes' }
                ]}
            />
        </div>
    );
}

export default UserSettings;
