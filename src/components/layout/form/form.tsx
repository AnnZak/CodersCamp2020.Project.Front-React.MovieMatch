import React from 'react';
import './form.scss';

type inputType = ('text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'submit' | 'checkbox' | 'button' | 'color' | 'file' | 'radio' | 'range' | 'submit');

interface IInput {
    type: inputType;
    label?: string;
    value?: string;
    placeholder?: string;
    attr?: { accept?: string };
    setValue?: Function;
    onClick?: Function;
    paragraph?: string;
}

interface IProps {
    heading: string;
    inputs: Array<IInput>;
    formNavButtons?: { previous: boolean, next: boolean };
    formNavFunctions?: { handlePrevious?: Function | undefined, handleNext?: Function | undefined }
    info?: string;
    onSubmit?: Function;
}

function Form({ heading, inputs, formNavButtons, formNavFunctions, info, onSubmit }: IProps) {

    function handlePrevious() {
        if (!formNavFunctions || !formNavFunctions.handlePrevious) return undefined;
        formNavFunctions.handlePrevious();
        return undefined;
    }

    function handleNext() {
        if (!formNavFunctions || !formNavFunctions.handleNext) return undefined;
        formNavFunctions.handleNext();
        return undefined;
    }

    return (
        <div className='container'>
            <div className='container-div'>
                <h1 className='form-heading'>{heading}</h1>
                <div className='form-container'>
                    <p className='form-info'>{info}</p>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (onSubmit) {
                            onSubmit();
                        }
                    }}>
                        {inputs.map((input, index) => {
                            return (
                                <div className={
                                    input.type === 'radio' || input.type === 'checkbox' || input.type === 'color' ?
                                        'form-item oneline' : 'form-item'
                                }>
                                    {input.label && <label htmlFor={`input${index}`}>{input.label}</label>}
                                    {input.paragraph && (<p className="input-description">{input.paragraph}</p>)}
                                    <input type={input.type}
                                        id={`input${index}`}
                                        placeholder={input.placeholder ? input.placeholder : undefined}
                                        value={input.value ? input.value : undefined}
                                        accept={input.attr && input.attr.accept ? input.attr.accept : undefined}
                                        onChange={(e) => { if (input.setValue) input.setValue(e.target.value); }}
                                        onClick={(e) => { if (input.onClick) input.onClick()}}
                                    />
                                </div>
                            );
                        })}
                    </form>
                </div>
                <div className='form-container-nav'>
                    {formNavButtons ? (
                        <div className='form-nav'>
                            <button onClick={() => handlePrevious()} className={formNavButtons.previous ? undefined : 'btn-hidden'}>Previous Page</button>
                            <button onClick={() => handleNext()} className={formNavButtons.next ? undefined : 'btn-hidden'}>Next Page</button>
                        </div>
                    ) : undefined}
                </div>
            </div>
        </div>
    );
}

export default Form;
