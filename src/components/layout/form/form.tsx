import React from 'react';
import './form.scss';

type inputType = ('text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'submit' | 'checkbox' | 'button' | 'color' | 'file' | 'radio' | 'range' | 'submit');

interface IInput {
    type: inputType;
    label?: string;
    value?: string;
    placeholder?: string;
    attr?: { accept?: string };
}

interface IProps {
    heading: string;
    inputs: Array<IInput>;
    formNavButtons?: { previous: boolean, next: boolean };
    formNavFunctions?: { handleP?: Function | undefined, handleN?: Function | undefined }
    info?: string;
}

function Form({ heading, inputs, formNavButtons, formNavFunctions, info }: IProps) {

    function handlePrevious() {
        if (!formNavFunctions || !formNavFunctions.handleP) return undefined;
        formNavFunctions.handleP();
        return undefined;
    }

    function handleNext() {
        if (!formNavFunctions || !formNavFunctions.handleN) return undefined;
        formNavFunctions.handleN();
        return undefined;
    }

    return (
        <div className='container'>
            <div className='form-container'>
                <h1 className='form-heading'>{heading}</h1>
                <p className='form-info'>{info}</p>
                <form>
                    {inputs.map((input, index) => {
                        return (
                            <div className={
                                input.type === 'radio' || input.type === 'checkbox' || input.type === 'color' ?
                                    'form-item oneline' : 'form-item'
                            }>
                                {input.label ? (<label htmlFor={`input${index}`}>{input.label}</label>) : undefined}
                                <input type={input.type}
                                    id={`input${index}`}
                                    placeholder={input.placeholder ? input.placeholder : undefined}
                                    value={input.value ? input.value : undefined}
                                    accept={input.attr && input.attr.accept ? input.attr.accept : undefined}
                                />
                            </div>
                        );
                    })}
                </form>
                {formNavButtons ? (
                    <div className='form-nav'>
                        <button onClick={() => handlePrevious()} className={formNavButtons.previous ? undefined : 'btn-hidden'}>Previous Page</button>
                        <button onClick={() => handleNext()} className={formNavButtons.next ? undefined : 'btn-hidden'}>Next Page</button>
                    </div>
                ) : undefined}

            </div>
        </div>
    );
}

export default Form;
