import React, {useState, useEffect} from "react";
import './TextForm.css';
import ContentEditable from 'react-contenteditable'


const TextForm = (props) => {

    const [html, setHtml] = useState('');


    const handleChange = e => {
        let value = e.target.value;
        setHtml(value);
        if (value[value.length - 1] === ' ') {
            props.checkText(html); //props.text and props.notRightWords will update
            //use CreateWordsArray to show it
        }
    };

    // need to change CreateWordsArray func
    const CreateWordsArray = (notRightWords, text) => {
        let WordsArray = [];
        for (let i = 0; i < text.length; i++) {
            if (i === 2) {
                WordsArray.push(<span><span
                    className={'textColor'}>{text[i]}</span><span>{"\u00A0"}</span></span>)
            } else {
                WordsArray.push(<span><span
                    className={'textRight'}>{text[i]}</span><span>{"\u00A0"}</span></span>)
            }
        }
        return WordsArray
    }

    return (<ContentEditable className={'divInner'} html={html} onChange={handleChange}/>);
}

export default TextForm;