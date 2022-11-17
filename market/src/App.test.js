/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders navbar with logo', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // eslint-disable-next-line testing-library/prefer-screen-queries
  // expect(getByText(/learn/i)).toBeInTheDocument();

  expect(getByText('Visible Details Example')).toBeVisible()

});
