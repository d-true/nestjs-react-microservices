import { StrictMode } from 'react';
import { AppProvider } from './AppProvider';
import { AppRoutes } from './Routes.tsx';
import { createRoot } from 'react-dom/client';
import './index.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppProvider>
            <AppRoutes />
        </AppProvider>
    </StrictMode>,
);
