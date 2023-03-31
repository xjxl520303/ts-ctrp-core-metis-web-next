
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.menu.fetchMenus:invocation[0]": { type: "done.invoke.menu.fetchMenus:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.menu.fetchMenus:invocation[0]": { type: "error.platform.menu.fetchMenus:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "request": "done.invoke.menu.fetchMenus:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "addCacheGroupMenu": "ADD_CACHE.group";
"addCacheMenu": "ADD_CACHE.menu";
"handleResError": "error.platform.menu.fetchMenus:invocation[0]";
"initActiveGroupMenu": "done.invoke.menu.fetchMenus:invocation[0]";
"initActiveMenu": "done.invoke.menu.fetchMenus:invocation[0]";
"initCacheGroupMenu": "done.invoke.menu.fetchMenus:invocation[0]";
"initCacheMenu": "done.invoke.menu.fetchMenus:invocation[0]";
"initFjdIds": "done.invoke.menu.fetchMenus:invocation[0]";
"initMenus": "done.invoke.menu.fetchMenus:invocation[0]";
"removeCacheGroupMenu": "REMOVE_CACHE.group";
"setActiveGroupMenu": "SET.activeGroup";
"setActiveMenu": "SET.active";
"setCache": "SET.cache";
"setTabVisible": "SET.tabVisible";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "request": "REQUEST";
        };
        matchesStates: "action" | "action.addCacheGroup" | "action.addCacheMenu" | "action.idle" | "action.removeCacheGroupMenu" | "action.setActive" | "action.setActiveGroup" | "action.setCache" | "action.setTabVisible" | "fetchMenus" | "idle" | { "action"?: "addCacheGroup" | "addCacheMenu" | "idle" | "removeCacheGroupMenu" | "setActive" | "setActiveGroup" | "setCache" | "setTabVisible"; };
        tags: never;
      }
  