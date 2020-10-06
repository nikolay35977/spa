import React from "react";
import ReactDOM from 'react-dom';
import './TextForm.css';


const ContentEditable = (props) => {


    const emitChange = (e) => {
        let content = ReactDOM.findDOMNode(e.target);
        props.onChange(content);
    }
    
    const focusFunc = (e) => {
        console.log(e);
    }
    
    return <div id={"form"} className={'divInner'} onInput={emitChange}
                contentEditable={true} onBlur={emitChange} dangerouslySetInnerHTML={{__html: props.html}} onFocus={focusFunc}/>
}

export default ContentEditable;