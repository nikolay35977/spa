import {getCheckWord} from '../Api/Api';

const SET_TEXT = 'SET-TEXT',
    SET_NOT_RIGHT_WORDS = 'SET-NOT-RIGHT-WORDS';

let initialState = {
    text: '',
    notRightWords: []
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
        text = text.toLowerCase();
        let idElement = -1;
        for (let i = 0; i < wordsArray.length; i++) {
            idElement = text.indexOf(wordsArray[i]);
            if (idElement !== -1) {
                console.log(idElement);
                dispatch(setNotRightWords(idElement));
            }
        }
    }
}

export const checkText = (value) => {
    return (dispatch) => {
        getCheckWord(value).then(data => {
            let incorrectWords = getWordsFromRequest(data[0]);
            if (incorrectWords.length !== 0) {
                dispatch(selectWordsFromForm(incorrectWords, value));
            }
        });
        dispatch(setText(value));
    }
}

export default TextReducer;