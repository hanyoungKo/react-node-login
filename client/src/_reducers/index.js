import { combineReducers } from "redux";
// 여러 리듀서들을 모아주는 
import user from './user_reducer';

const rootReducer = combineReducers({
    user,
})

export default rootReducer;