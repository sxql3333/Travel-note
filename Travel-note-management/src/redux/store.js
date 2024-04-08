import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers' 
// import thunk from "redux-thunk"
import { thunk, withExtraArgument } from 'redux-thunk';
// import {composeWithDevTools} from "redux-devtools-extension"

// const middleware = [thunk];
// const store = createStore(reducers, applyMiddleware(thunk));
// export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
export default createStore(reducers, applyMiddleware(thunk))
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import reducers from './reducers';

// const store = createStore(reducers, applyMiddleware(thunk.default));

// export default store;