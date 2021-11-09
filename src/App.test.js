import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/rootReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';


let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>);
  const linkElement = getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});
