# ts-ctrp-core-metis-web-next

正行控制塔 SCCT(Supply Chain Control Tower) v3.0

## 环境说明

- `dev`：开发环境 对应2.0系统的 https://metis-web-dev1.sit.sf-express.com/#/login
- `sit`: 集成测试环境 对应 2.0 系统的 https://metis-web.sit.sf-express.com/#/login
- `uat`: 用户接收测试环境 对应 2.0 系统的 https://metis-web-dev.sit.sf-express.com/#/login
- `pre`: 预生产环境 对应 2.0 系统的 https://metis-web-pr.sf-express.com/#/login
- `prod`: 生成环境 对应 2.0 系统的 https://scct.sf-express.com/

## Git 提交规范

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 样式修改
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流程改进
- `ci` 持续集成
- `types` 类型定义文件修改
- `wip` 开发中

## Machine 样例代码

```ts
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { RegisterContext } from './context'
import type { RegisterEvents } from './events'

type RegisterServices = {

}

export type RegisterMachine = ReturnType<typeof createRegisterMachine>

export const createRegisterMachine = () => {
  return createMachine({
    schema: {
      context: {} as RegisterContext,
      events: {} as RegisterEvents,
      services: {} as RegisterServices,
    },
    tsTypes: {} as import('./machine.typegen').Typegen0,
    predictableActionArguments: true,
    id: 'register',
    states: {},
  }, {
    actions: {},
    services: {},
  })
}
```