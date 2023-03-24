export type LoginEvents =
  | { type: 'SHOW_TRIAL_TIPS' }
  | { type: 'SHOW_APP_DOWNLOAD' }
  | { type: 'SHOW_REGISTER' }
  | { type: 'SHOW_COUNTDOWN' }
  /* --------------------------------- REQUEST -------------------------------- */
  | { type: 'SEND_PHONE_CODE'; phone?: string }
  | { type: 'LOGIN_BY_PHONE'; phone: string; phoneCode: string }
  | { type: 'UPDATE_USER_ATTR'; key: string; value: any }
