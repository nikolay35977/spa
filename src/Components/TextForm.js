import React, {useState, useEffect} from "react";
import './TextForm.css';
import ContentEditable from 'react-contenteditable'


class TextForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {html: '', countSpaces: 0};
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.countSpaces !== this.state.countSpaces) this.setState({html: this.CreateWordsArray(this.props.notRightWords ,this.props.text)});
    }

    handleChange = e => {
        let value = e.target.value;
        if (value[value.length - 1].charCodeAt() === 59) {
            this.setState({countSpaces: e.target.value.split('&nbsp').length});
            this.props.checkText(value); //props.text and props.notRightWords will update
            //use CreateWordsArray to show it
        }
    };

    // need to change CreateWordsArray func
    CreateWordsArray = (notRightWords, text) => {
        debugger;
        text = text.split('&nbsp;');
        let WordsArray = '';
        this.setState({html: ''});
        for (let i = 0; i < text.length; i++) {
            if (i === 2) {
                WordsArray += `<span style="color: red">${text[i] + '&nbsp;'}</span>`
            } else {
                WordsArray += text[i]+'&nbsp'
            }
        }
        console.log(WordsArray);
        return WordsArray
    }

    render() {

        return (<ContentEditable className={'divInner'} html={this.state.html} onChange={this.handleChange}/>);
    }

}

export default TextForm;