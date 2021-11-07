import logger from 'redux-logger';
import RcReduxModel from 'rc-redux-model';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import globalModel from './globalModel';
import resumeModel from './resumeModel';
import templateModel from './templateModel';
import themeModel from './themeModel';

const reduxModel = new RcReduxModel([globalModel, resumeModel, templateModel, themeModel]);

const reducerList = combineReducers(reduxModel.reducers);

export default createStore(reducerList, applyMiddleware(reduxModel.thunk, logger));
