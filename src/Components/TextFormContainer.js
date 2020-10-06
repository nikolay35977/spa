import React from "react";
import {connect} from "react-redux";
import {checkText} from "../ReduxStore/TextReducer";
import TextForm from "./TextForm";

let mapStateToProps = (state) => {
    return {
        text: state.Text.text,
        notRightWords: state.Text.notRightWords
    }
}

let mapDispatchToProps = {
    checkText
}

const TextFormContainer = connect(mapStateToProps, mapDispatchToProps)(TextForm);

export default TextFormContainer;