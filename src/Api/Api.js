import Axios from "axios";

export const getCheckWord = (word) => {
    return Axios.get(`http://speller.yandex.net/services/spellservice.json/checkTexts?text=${word}`).then(response => response.data)
}