import React from "react";
import style from './FormsControls.module.css'
import {Field} from "redux-form";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

export const FormControl = ({input, meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={style.formControl + " " + (hasError ? style.error : "email")}>
            <div>{children}</div>
            {hasError && <span>{error}</span>}
        </div>
    )
};

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl{...props}><TextField id="outlined-basic" label="Enter yor text"
                                             variant="outlined"  {...input} {...restProps}/></FormControl>
};

export const InputType = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl{...props}><Input {...input} {...restProps}/></FormControl>
}

export const createField = (placeholder, name, component, validate, props = {}, text = '') => (
    <div><Field placeholder={placeholder} name={name} component={component} validate={validate} {...props}/>{text}
    </div>);