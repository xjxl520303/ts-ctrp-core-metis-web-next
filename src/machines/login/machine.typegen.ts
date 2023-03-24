
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "error.platform.login.form.login:invocation[0]": { type: "error.platform.login.form.login:invocation[0]"; data: unknown };
"error.platform.login.form.sms:invocation[0]": { type: "error.platform.login.form.sms:invocation[0]"; data: unknown };
"error.platform.login.form.user:invocation[0]": { type: "error.platform.login.form.user:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "loginByPhone": "done.invoke.login.form.login:invocation[0]";
"sendPhoneCode": "done.invoke.login.form.sms:invocation[0]";
"updateUserAttr": "done.invoke.login.form.user:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "handleResError": "error.platform.login.form.login:invocation[0]" | "error.platform.login.form.sms:invocation[0]" | "error.platform.login.form.user:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "loginByPhone": never;
"sendPhoneCode": "SEND_PHONE_CODE";
"updateUserAttr": "UPDATE_USER_ATTR";
        };
        matchesStates: "form" | "form.error" | "form.login" | "form.sms" | "form.success" | "form.success.sms" | "form.success.user" | "form.user" | "idle" | { "form"?: "error" | "login" | "sms" | "success" | "user" | { "success"?: "sms" | "user"; }; };
        tags: never;
      }
  