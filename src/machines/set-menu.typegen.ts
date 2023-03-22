
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.request": { type: "done.invoke.request"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.request": { type: "error.platform.request"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "fetchMenus": "done.invoke.request";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "getActiveGroupMenu": "MARK.activeGroup";
"getActiveMenu": "MARK.active";
"getFjtIds": "GET_FJT_IDS";
"handleResError": "ERROR" | "error.platform.request";
"handleResSuccess": "done.invoke.request";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "fetchMenus": "REQUEST";
        };
        matchesStates: "error" | "idle" | "request" | "success";
        tags: never;
      }
  