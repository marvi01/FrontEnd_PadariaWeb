import { combineReducers } from 'redux';

import tarefasReducer from './reduxModules/tarefas/reducer';

export default combineReducers({
    stateTarefas: tarefasReducer
});