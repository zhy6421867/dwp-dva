import { login } from 'services/login';
import { dealError } from 'utils/error';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'login',

  state: {
    userInfo: {},
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {  // eslint-disable-line
  //   },
  // },

  effects: {
    *loginAction({ payload }, { call, put }) {  // eslint-disable-line
      try {
        const { success, body } = yield call(login, payload);
        if (success) {
          yield put({
            type: 'saveUserInfo',
            payload: body,
          });
          yield put(routerRedux.push('/search-accounts'));
        }
      } catch (err) {
        dealError(err);
      }
    },
  },

  reducers: {
    saveUserInfo(state, action) {
      return {
        ...state,
        userInfo: Object.assign({}, action),
      };
    },
  },

};
