
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.dynamicList.api.getDynamicList:invocation[0]": { type: "done.invoke.dynamicList.api.getDynamicList:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.dynamicList.api.getMilestone:invocation[0]": { type: "done.invoke.dynamicList.api.getMilestone:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.dynamicList.api.getPageConfig:invocation[0]": { type: "done.invoke.dynamicList.api.getPageConfig:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.dynamicList.api.getDynamicList:invocation[0]": { type: "error.platform.dynamicList.api.getDynamicList:invocation[0]"; data: unknown };
"error.platform.dynamicList.api.getMilestone:invocation[0]": { type: "error.platform.dynamicList.api.getMilestone:invocation[0]"; data: unknown };
"error.platform.dynamicList.api.getPageConfig:invocation[0]": { type: "error.platform.dynamicList.api.getPageConfig:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "getDynamicList": "done.invoke.dynamicList.api.getDynamicList:invocation[0]";
"getMilestone": "done.invoke.dynamicList.api.getMilestone:invocation[0]";
"getPageConfig": "done.invoke.dynamicList.api.getPageConfig:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "handleError": "error.platform.dynamicList.api.getDynamicList:invocation[0]" | "error.platform.dynamicList.api.getMilestone:invocation[0]" | "error.platform.dynamicList.api.getPageConfig:invocation[0]";
"initDynamicList": "done.invoke.dynamicList.api.getDynamicList:invocation[0]";
"initMilestone": "done.invoke.dynamicList.api.getMilestone:invocation[0]";
"initPageConfig": "done.invoke.dynamicList.api.getPageConfig:invocation[0]";
"setSlicerFormModels": "SET.slicerFormModels";
        };
        eventsCausingDelays: {

        };
        eventsCausingGuards: {

        };
        eventsCausingServices: {
          "getDynamicList": "GET_DYNAMIC_LIST";
"getMilestone": "GET_MILESTONE";
"getPageConfig": "GET_PAGE_CONFIG";
        };
        matchesStates: "api" | "api.getDynamicList" | "api.getDynamicList.failed" | "api.getDynamicList.initial" | "api.getDynamicList.success" | "api.getMilestone" | "api.getMilestone.failed" | "api.getMilestone.initial" | "api.getMilestone.success" | "api.getPageConfig" | "api.getPageConfig.failed" | "api.getPageConfig.initial" | "api.getPageConfig.success" | "idle" | "ui" | "ui.setSlicerFormModels" | { "api"?: "getDynamicList" | "getMilestone" | "getPageConfig" | { "getDynamicList"?: "failed" | "initial" | "success";
"getMilestone"?: "failed" | "initial" | "success";
"getPageConfig"?: "failed" | "initial" | "success"; };
"ui"?: "setSlicerFormModels"; };
        tags: never;
      }
