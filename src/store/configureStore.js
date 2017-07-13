import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './rootReducer'

export default function configureStore(preloadedState) {
    return createStore(
    rootReducer,
    preloadedState,
    compose(
        applyMiddleware(
          thunkMiddleware,
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
    )
}
