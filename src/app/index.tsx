import React from 'react';
import ReactDOM from "react-dom";
import { IndexPage } from "./components/index-page/index-page";
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';


const browserHistory = createBrowserHistory();

ReactDOM.render(<Router history={browserHistory}><IndexPage/></Router>, document.getElementById('root'));