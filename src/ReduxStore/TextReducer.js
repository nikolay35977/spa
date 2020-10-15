import {getCheckWord} from '../Api/Api';

const SET_WORDS_ARRAY = 'SET-WORDS-ARRAY',
    IS_FETCHING = 'IS-FETCHING',
    REDUCER_CHANGE = 'REDUCER-CHANGE';

let initialState = {
    html: '',
    isFetching: false,
    reducerChange: false
};

const TextReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WORDS_ARRAY:
            return {...state, html: action.html}
        case IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case REDUCER_CHANGE:
            return {...state, reducerChange: action.reducerChange}
        default:
            return state
    }
}

const setReducerChange = (reducerChange) =>
    ({
        type: REDUCER_CHANGE,
        reducerChange
    })

const setIsFetching = (isFetching) =>
    ({
        type: IS_FETCHING,
        isFetching
    })

const setWordsArray = (html) =>
    ({
        type: SET_WORDS_ARRAY,
        html
    })


const getWordsFromRequest = (wordsDict) => {
    let newArray = new Map();
    for (let i = 0; i < wordsDict.length; i++) {
        newArray.set(wordsDict[i]['pos'], wordsDict[i]['word']);
    }
    return newArray;
}

const getRightText = (text) => {
    text = text.split(`<span style="color: red">`).join('').split(`</span>`).join('').split('</p>').join('').split('<p>').join('');
    return text
}

const CreateWordsArray = (notRightWords, text, reducerChange) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        console.log(notRightWords);
        for (let [key, value] of notRightWords) {
            text = text.replace(value ,(value ) =>`<span style="color: red">${value}</span>`);
        }
        if (!reducerChange) dispatch(setWordsArray('<p>' + text + '</p>'));
        dispatch(setIsFetching(false));
    }
}


export const checkText = (value, isFetching, reducerChange) => {
    return (dispatch) => {
        if (isFetching) {
            dispatch(setWordsArray('<p>' + value + '</p>'));
            dispatch(setReducerChange(true));
        } else {
            dispatch(setReducerChange(false));
            value = getRightText(value);
            getCheckWord(value.replace(/&nbsp;/gi, ' ')).then(data => {
                let incorrectWords = getWordsFromRequest(data[0]);
                dispatch(CreateWordsArray(incorrectWords, value, reducerChange));
            });
        }
    }
}

export default TextReducer;