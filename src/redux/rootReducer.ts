import { counterReducer } from './counter/slice';
import { reportsReducer } from './reports/slice';

const rootReducer = {
  counter: counterReducer,
  reports: reportsReducer
};

export default rootReducer;
