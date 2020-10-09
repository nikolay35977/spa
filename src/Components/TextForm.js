import React, {useState, useEffect} from "react";
import './TextForm.css';
import ContentEditable from 'react-contenteditable'


const TextForm = (props) => {

    const [html, changeHtml] = useState('');
    //const [checkBool, changeCheckBool] = useState(false);

    /*constructor(props) {
        super(props);
        this.state = {html: '', checkBool: false, value: ''};
    }*/
    /*componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props.html);
        if (this.props.html !== prevProps.html) {
            debugger;
            this.setState({html: this.props.html});
        }
    }*/

    useEffect(() => {
        changeHtml(props.html);
    }, [props.html])

    const handleChange = e => {
        let value = e.target.value;
        if (value[value.length - 1].charCodeAt() === 59 && value !== html) {
            //changeCheckBool(false);
            props.checkText(value);
        }
        //props.text and props.notRightWords will update
        //use CreateWordsArray to show it
    };


    return (<ContentEditable className={'divInner'} html={html} onChange={handleChange}/>);


}

export default TextForm;