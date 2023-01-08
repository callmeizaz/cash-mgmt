import React from 'react';
// import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './config/theme';
import Router from './router/Router';
import { SnackbarProvider } from 'notistack';
// import history from './redux/history';
import store, { persistor } from './redux/store';
import RedirectWrapper from './components/RedirectWrapper';

const App = () => {
  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <PersistGate loading={null} persistor={persistor}>
        {/* <ConnectedRouter history={history}> */}
        <ThemeProvider theme={theme}>
          <CssBaseline>
            {/* @ts-ignore */}
            <SnackbarProvider maxSnack={3}>
              <RedirectWrapper>
                <Router />
              </RedirectWrapper>
            </SnackbarProvider>
          </CssBaseline>
        </ThemeProvider>
        {/* </ConnectedRouter> */}
      </PersistGate>
    </Provider>
  );
};

export default App;
