import React from 'react';
import TextFormContainer from "./Components/TextFormContainer";
import {Provider} from 'react-redux';
import store from "./ReduxStore/redux";

function App() {
    return (
        <Provider store={store}>
          <TextFormContainer/>
        </Provider>
    );
}

export default App;
