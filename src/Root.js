import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch } from 'react-router-dom'

import store from './store'
import App from './components/App'


const Root = () => {
    return (
        <Provider store={store}>

            <BrowserRouter>
                <Switch>
                    <App />
                </Switch>
            </BrowserRouter>

        </Provider>
    )
}

export default Root