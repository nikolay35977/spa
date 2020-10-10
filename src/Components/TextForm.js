import React from "react";
import './TextForm.css';
import ContentEditable from 'react-contenteditable'


const TextForm = (props) => {

    const handleChange = e => {
        let value = e.target.value;
        if (value) {
            props.checkText(value);
        }
    };


    return (<ContentEditable className={'divInner'} html={props.html} onChange={handleChange}/>);
}

export default TextForm;