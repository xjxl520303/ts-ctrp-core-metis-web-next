
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.global.api.getDict:invocation[0]": { type: "done.invoke.global.api.getDict:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.global.api.getDict:invocation[0]": { type: "error.platform.global.api.getDict:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "getDict": "done.invoke.global.api.getDict:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "handleResError": "error.platform.global.api.getDict:invocation[0]";
"setDict": "done.invoke.global.api.getDict:invocation[0]";
        };
        eventsCausingDelays: {

        };
        eventsCausingGuards: {

        };
        eventsCausingServices: {
          "getDict": "GET_DICT";
        };
        matchesStates: "api" | "api.getDict" | "api.getDict.failed" | "api.getDict.initial" | "api.getDict.success" | "api.idle" | { "api"?: "getDict" | "idle" | { "getDict"?: "failed" | "initial" | "success"; }; };
        tags: never;
      }
