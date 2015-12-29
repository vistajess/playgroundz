import 'babel-polyfill';
import 'jquery';
import 'bootstrap';
import '../common/utils/bootstrap';
import React from 'react';
import { render } from 'react-dom';
import Root from '../common/Root';
import configureStore from '../common/store/configureStore';

const $target = document.getElementById('mount');
const store = configureStore(window.__INITIAL_STATE__);
const node = <Root store={store} />;

render(node, $target);
