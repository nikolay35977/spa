import React, {useState, useEffect} from "react";
import './TextForm.css';
import ContentEditable from 'react-contenteditable'


const TextForm = (props) => {

    const [html, setHtml] = useState('');
    let contentEditable = React.createRef();


    const handleChange = e => {
        setHtml(e.target.value);
        props.checkText(html);
    };
/*
    useEffect(() => {
        CreateWordsArray(props.notRightWords, props.text);
    });*/

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

    return (<ContentEditable ref={contentEditable} className={'divInner'} html={html} onChange={handleChange}/>);
}

export default TextForm;