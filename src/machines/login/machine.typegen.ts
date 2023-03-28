
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "error.platform.login.api.loginByPhone:invocation[0]": { type: "error.platform.login.api.loginByPhone:invocation[0]"; data: unknown };
"error.platform.login.api.sendPhoneCode:invocation[0]": { type: "error.platform.login.api.sendPhoneCode:invocation[0]"; data: unknown };
"error.platform.login.api.updateUserAttr:invocation[0]": { type: "error.platform.login.api.updateUserAttr:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "loginByPhone": "done.invoke.login.api.loginByPhone:invocation[0]";
"sendPhoneCode": "done.invoke.login.api.sendPhoneCode:invocation[0]";
"updateUserAttr": "done.invoke.login.api.updateUserAttr:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "handleError": "error.platform.login.api.loginByPhone:invocation[0]" | "error.platform.login.api.sendPhoneCode:invocation[0]" | "error.platform.login.api.updateUserAttr:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "loginByPhone": "LOGIN_BY_PHONE";
"sendPhoneCode": "SEND_PHONE_CODE";
"updateUserAttr": "UPDATE_USER_ATTR";
        };
        matchesStates: "api" | "api.loginByPhone" | "api.loginByPhone.failed" | "api.loginByPhone.success" | "api.sendPhoneCode" | "api.sendPhoneCode.failed" | "api.sendPhoneCode.success" | "api.updateUserAttr" | "api.updateUserAttr.failed" | "api.updateUserAttr.success" | "end" | "ui" | { "api"?: "loginByPhone" | "sendPhoneCode" | "updateUserAttr" | { "loginByPhone"?: "failed" | "success";
"sendPhoneCode"?: "failed" | "success";
"updateUserAttr"?: "failed" | "success"; }; };
        tags: never;
      }
  