import {getCheckWord} from '../Api/Api';

const SET_TEXT = 'SET-TEXT',
    SET_NOT_RIGHT_WORDS = 'SET-NOT-RIGHT-WORDS';

let initialState = {
    text: '',
    notRightWords: [],
    wordsArrayHtml: []
};

const TextReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEXT:
            return {...state, text: action.text}
        case SET_NOT_RIGHT_WORDS:
            let newNotRightWords = state.notRightWords;
            if (!newNotRightWords.includes(action.newId)) newNotRightWords.push(action.newId);
            return {...state, notRightWords: newNotRightWords}
        default:
            return state
    }
}

const setText = (text) =>
    ({
        type: SET_TEXT,
        text
    })

const setNotRightWords = (newId) =>
    ({
        type: SET_NOT_RIGHT_WORDS,
        newId
    })

const getWordsFromRequest = (wordsDict) => {
    let newArray = [];
    for (let i = 0; i < wordsDict.length; i++) {
        newArray.push(wordsDict[i]['word']);
    }
    return newArray;
}

const selectWordsFromForm = (wordsArray, text) => {
    return (dispatch) => {
        let spacer = "&nbsp;";
        text = deleteEmptyElements(text.split(spacer));
        for (let i = 0; i < wordsArray.length; i++) {
            if (text.indexOf(wordsArray[i]) !== -1) {
                console.log(text.indexOf(wordsArray[i]));
                dispatch(setNotRightWords(text.indexOf(wordsArray[i])));
            }
        }
    }
}

const deleteEmptyElements = (oldArray) => {
    let newArray = [];
    for (let i = 0; i < oldArray.length; i++) {
        if (oldArray[i] !== '') {
            newArray.push(oldArray[i]);
        }
    }
    return newArray;
}

export const checkText = (value) => {
    return (dispatch) => {
        let spacer = ";";
        console.log(value[value.length - 1]);
        if (value[value.length - 1] === spacer || value[value.length - 1] === ' ') {
            getCheckWord(value).then(data => {
                let incorrectWords = getWordsFromRequest(data[0]);
                if (incorrectWords.length !== 0) {
                    dispatch(selectWordsFromForm(incorrectWords, value));
                }
            });
            dispatch(setText(value));
        } else dispatch(setText(value));
    }
}

export default TextReducer;