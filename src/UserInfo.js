import { merge } from 'lodash';
const LS_KEY = 'STTT_USER_INFO';

const UserInfo = {
  get() {
    return JSON.parse(window.localStorage.getItem(LS_KEY)) || {};
  },

  set(info) {
    return window.localStorage.setItem(
      LS_KEY,
      JSON.stringify(merge(UserInfo.get(), info))
    );
  },
};

export default UserInfo;
