
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.menu.api.getMenus:invocation[0]": { type: "done.invoke.menu.api.getMenus:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.menu.api.getMenus:invocation[0]": { type: "error.platform.menu.api.getMenus:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "getMenus": "done.invoke.menu.api.getMenus:invocation[0]";
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
"handleResError": "error.platform.menu.api.getMenus:invocation[0]";
"handleResSuccess": "done.invoke.menu.api.getMenus:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "getMenus": "GET_MENUS";
        };
        matchesStates: "api" | "api.getMenus" | "api.getMenus.failed" | "api.getMenus.success" | { "api"?: "getMenus" | { "getMenus"?: "failed" | "success"; }; };
        tags: never;
      }
  