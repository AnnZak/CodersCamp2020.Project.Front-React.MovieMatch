import React, { useState } from 'react';
import './UserSettings.scss'
import Form from '../../components/layout/form/form';
import Topbar from '../../components/layout/topbar/topbar';
import { userSelector, userApi, changeData } from '../../features/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

function UserSettings() {

    const [newName, setNewName] = useState<string>("");
    const [newDispName, setNewDispName] = useState<string>("");
    const [newEmail, setNewEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [passConf, setPassConf] = useState<string>("");

    const dispatch = useAppDispatch()
    const {_id, name, displayedName, email } = useAppSelector(userSelector)


    const chName = () => {
        dispatch(changeData({id: _id, toChange: {name: newName}}))
    };

    return (
        <div className="user-settings">
            <Topbar />
            <Form
                heading={'Account settings'}
                info={`Below you can change your account settings:`}
                inputs={[
                    { type: 'text', label: `Name:`, placeholder: name, value: newName, setValue: setNewName },
                    { type: 'button', value: 'Change name' },
                    { type: 'text', label: `Displayed name:`, placeholder: displayedName, value: newDispName, setValue: setNewDispName },
                    { type: 'button', value: 'Change displayed name' },
                    { type: 'email', label: `email:`, placeholder: email, value: newEmail, setValue: setNewEmail },
                    { type: 'button', value: 'Change account email' },
                    { type: 'password', label: 'New password:', placeholder: 'Your Secret Password', value: pass, setValue: setPass },
                    { type: 'password', label: 'Confirm new password:', placeholder: 'Confirm New Secret Password', value: passConf, setValue: setPassConf },
                    { type: 'button', value: 'Change password' },
                ]}
            />
        </div>
    );
}

export default UserSettings;
