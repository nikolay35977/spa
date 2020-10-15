import React from "react";
import './TextForm.css';
import ContentEditable from 'react-contenteditable'


const TextForm = (props) => {

    const handleChange = e => {
        let value = e.target.value;
        console.log(value);
        if (value) {
            props.checkText(value, props.isFetching, props.reducerChange);
        }
    };


    return (<ContentEditable className={'divInner'} html={props.html}
                                                             onChange={handleChange}/>);
}

export default TextForm;