
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "selectNext": "STEP.next";
"selectPrev": "STEP.prev";
"selectStep": "SET_STEP";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          
        };
        matchesStates: "api" | "ui" | "ui.one" | "ui.three" | "ui.two" | { "ui"?: "one" | "three" | "two"; };
        tags: never;
      }
  