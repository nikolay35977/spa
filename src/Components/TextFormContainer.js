import React from "react";
import {connect} from "react-redux";
import {checkText} from "../ReduxStore/TextReducer";
import TextForm from "./TextForm";

let mapStateToProps = (state) => {
    return {
        html: state.Text.html,
        isFetching: state.Text.isFetching,
        reducerChange: state.Text.reducerChange
    }
}

let mapDispatchToProps = {
    checkText
}

const TextFormContainer = connect(mapStateToProps, mapDispatchToProps)(TextForm);

export default TextFormContainer;