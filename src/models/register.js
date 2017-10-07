import { register } from 'services/register';
import { dealError, dealSuccess } from 'utils/error';
import { routerRedux } from 'dva/router';

const delay = ms => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export default {

  namespace: 'register',

  state: {
    loginInfo: {},
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {  // eslint-disable-line
  //   },
  // },

  effects: {
    *registerAction({ payload }, { call, put }) {  // eslint-disable-line
      try {
        const { success, body } = yield call(register, payload);
        if (success) {
          yield put({
            type: 'saveLoginInfo',
            payload: body,
          });
          body.message = '注册成功！';
          dealSuccess(body);
          yield call(delay, 3000);
          yield put(routerRedux.push('/search-accounts'));
        }
      } catch (err) {
        dealError(err);
      }
    },
  },

  reducers: {
    saveLoginInfo(state, action) {
      return {
        ...state,
        loginInfo: Object.assign({}, action),
      };
    },
  },

};
