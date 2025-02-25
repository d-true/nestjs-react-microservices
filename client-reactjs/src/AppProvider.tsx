import store from './store/configure-store.ts';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router';

export function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <React.Suspense>
            <Provider store={store}>
                <Router>{children}</Router>
            </Provider>
        </React.Suspense>
    );
}
