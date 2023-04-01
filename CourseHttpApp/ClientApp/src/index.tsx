import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.css'
import DataProvider from "./context/DataProvider";
import {store} from './store/store'
import {Provider} from "react-redux";
import "normalize.css";

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
        <DataProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </DataProvider>
    </Provider>
);
