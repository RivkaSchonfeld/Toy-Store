
import {combineReducers, createStore} from 'redux'; 

import { catred } from "./reducers/categoryreducer";
import { custred } from "./reducers/costumerreducer";
import { purred } from "./reducers/purchasereducer";
import { gamered } from "./reducers/gamereducer";
import { cartred } from './reducers/cartreducer';

const reducer=combineReducers({catred,custred,purred,gamered,cartred});

export const store=createStore(reducer)
window.store=store

//this page seems like its finished!!