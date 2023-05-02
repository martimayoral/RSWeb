import { authReducer } from './auth/slice';
import { counterReducer } from './counter/slice';
import { reportsReducer } from './reports/slice';

const rootReducer = {
  counter: counterReducer,
  reports: reportsReducer,
  auth: authReducer
};

export default rootReducer;
