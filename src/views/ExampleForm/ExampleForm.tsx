import React from 'react';
import Form from '../../components/layout/form/form';

function ExampleForm() {
    return (
        <Form
            heading="Welcome, tell us more about yourself!"
            inputs={[
                { type: 'text', label: 'First Name:', placeholder: 'e.g. Geralt' },
                { type: 'text', label: 'Displayed name:', placeholder: 'e.g. Gwynbleidd' },
                { type: 'email', label: 'Email:', placeholder: 'e.g. geralt@kaermorhen.com' },
                { type: 'search', label: 'Search:', placeholder: "e.g. Ciri's whereabouts" },
                { type: 'number', label: 'Number:', placeholder: 'e.g. 10' },
                { type: 'password', label: 'Password:', placeholder: 'e.g. Rivia123*' },
                { type: 'tel', label: 'Telephone:', placeholder: 'e.g. +01 234 567 890' },
                { type: 'url', label: 'URL:', placeholder: 'e.g. witchering.com' },
                { type: 'date', label: 'Date:' },
                { type: 'checkbox', label: 'Yennefer of Vengerberg' },
                { type: 'radio', label: 'Triss Merigold' },
                { type: 'range', label: 'Sign Power' },
                { type: 'color', label: 'Pick new haircolor' },
                { type: 'file', label: 'Show your style:' },
                { type: 'button', value: 'Drink with Dandelion' },
                { type: 'submit', value: 'Send info' },
            ]}
            formNavButtons={{ previous: true, next: false }}
            // formNavFunctions={{ handleP, handleN }}
            info={`Provide all the required information.`}
        />
    );
}

export default ExampleForm;
