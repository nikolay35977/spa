import {getCheckWord} from '../Api/Api';

const SET_WORDS_ARRAY = 'SET-WORDS-ARRAY';

let initialState = {
    html: ''
};

const TextReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WORDS_ARRAY:
            return {...state, html: action.html}
        default:
            return state
    }
}

const setWordsArray = (html) =>
    ({
        type: SET_WORDS_ARRAY,
        html
    })

const getWordsFromRequest = (wordsDict) => {
    let newArray = [];
    for (let i = 0; i < wordsDict.length; i++) {
        newArray.push(wordsDict[i]['word']);
    }
    return newArray;
}

const getRightText = (text) => {
    let newText = '',
        boolCheck = true;
    text = text.replace(/&nbsp;/gi, ' ');
    for (let i = 0; i < text.length; i++) {
        if (text[i] === '<') boolCheck = false
        if (text[i - 1] === '>') boolCheck = true
        if (boolCheck) newText += text[i];
    }
    return newText
}

const CreateWordsArray = (notRightWords, text) => {
    return (dispatch) => {
        text = text.split(' ');
        let WordsArray = [];
        for (let i = 0; i < text.length; i++) {
            if (notRightWords.includes(text[i])) {
                WordsArray.push(`<span style="color: red">${text[i]}</span>`);
            } else {
                WordsArray.push(text[i]);
            }
        }
        dispatch(setWordsArray(WordsArray.join('&nbsp;')));
    }
}

export const checkText = (value) => {
    return (dispatch) => {
        value = getRightText(value);
        getCheckWord(value).then(data => {
            let incorrectWords = getWordsFromRequest(data[0]);
            dispatch(CreateWordsArray(incorrectWords, value));
        });
    }
}

export default TextReducer;