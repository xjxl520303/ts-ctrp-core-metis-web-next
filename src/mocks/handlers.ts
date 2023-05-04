import { rest } from 'msw'
import { ResponseCodeEnum } from '@/enums'

export const handlers = [
  /** 手机号获取验证码 */
  rest.post('/api/metis/user/send/phoneCode', (req, res, ctx) => {
    return res(
      ctx.json({
        code: ResponseCodeEnum.SUCCESS,
        data: true,
        message: '发送成功',
      }),
    )
  }),
  /** 手机号登录 */
  rest.post('/api/metis/user/phone/login', (req, res, ctx) => {
    return res(
      ctx.json({ requestId: 'REQ-e878218d-861a-4332-8ec4-9766159c685d', code: '00000', message: '成功状态码', data: { id: '31184', userCode: '13247220346', userName: '吴杰', email: 'wujie792@sf-express.com', phone: '13247220346', tenant: 'S22011900003', role: null, roleDesc: null, lastLoginTime: null, area: null, token: 'scct.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MzExODRfMTMyNDcyMjAzNDZfMTY3NzU0ODUzMDg5Mw.NTzI4NnXN3LyUEWr48IIGsvkvWlKmubHvWyxO01_C_4', loginTime: 1677548531017, productName: '大网-仓配', productCode: 'RPP1', tenantId: null, stoken: null, sessionId: null, orderNo: 'S22011900003', attr: { style: 'black', language: 'cn', preOpenValidityEnd: null }, roles: { 1235: 'externalUserAdmin' }, companyCodeList: ['W0210149917', '7843728957891', 'S22011900003', '7550818141', '99999'], ticket: null, customerAlias: 'S22011900003', tenantName: '快乐小朋友', contractType: 1, contractSignStatus: 1, contractFileName: null, contractFilePath: null, customerName: '快乐小朋友', payType: 'year', userYearPayDto: { grade: 'A', pay: true, orderNo: null, expirationDate: '2023-01-21' }, businessStatus: 1, businessCode: null, businessCustomerName: '大网-仓配', preOpenDto: null, properties: {}, sfuser: false } }),
    )
  }),
  /** 页面配置 */
  rest.get('/api/metis/menu/getPageConfig', (req, res, ctx) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          res(
            ctx.status(200),
            ctx.json(import.meta.glob('./json/menu_getPageConfig.json', { eager: true })['./json/menu_getPageConfig.json']),
          ),
        )
      }, 200)
    })
  }),
  /** 工单类型 */
  rest.get('/api/metis/dict/getDict', (req, res, ctx) => {
    return res(
      ctx.json(import.meta.glob('./json/dict_getDict_woTypeDict.json', { eager: true })['./json/dict_getDict_woTypeDict.json']),
    )
  }),
  /** 里程碑数据 */
  rest.post('/api/metis/dynamic/getMileStoneData', (req, res, ctx) => {
    // return res(
    //   ctx.json(import.meta.glob('./json/dynamic_getMileStoneData.json', { eager: true })['./json/dynamic_getMileStoneData.json']),
    // )
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          res(
            ctx.status(200),
            ctx.json(import.meta.glob('./json/dynamic_getMileStoneData.json', { eager: true })['./json/dynamic_getMileStoneData.json']),
          ),
        )
      }, 200)
    })
  }),
  /** 列表数据 */
  rest.post('/api/metis/dynamic/getPage', (req, res, ctx) => {
    // return res(
    //   ctx.json(import.meta.glob('./json/dynamic_getPage.json', { eager: true })['./json/dynamic_getPage.json']),
    // )
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          res(
            ctx.status(200),
            ctx.json(import.meta.glob('./json/dynamic_getPage.json', { eager: true })['./json/dynamic_getPage.json']),
          ),
        )
      }, 500)
    })
  }),
  /** 菜单 */
  rest.get('/api/metis/menu/getMenu', (req, res, ctx) => {
    return res(
      ctx.json({ requestId: 'REQ-56a1967b-4a4c-4bee-aea8-dadb051af4a9', code: '00000', message: '成功状态码', data: [{ code: 'pageHome', nameCn: '首页', nameEn: 'pageHome', menuList: [{ id: 100, nameCn: '首页', nameEn: 'Home', type: 'fjt', orderType: null, url: '/fjt', sort: '1' }, { id: 212, nameCn: '首页2', nameEn: 'Home', type: 'fjt', orderType: null, url: '/fjt', sort: '1' }] }, { code: 'order', nameCn: '订单', nameEn: 'order', menuList: [{ id: 460, nameCn: '销售订单-伽蓝2B（件）', nameEn: '销售订单-伽蓝2B（件）', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '-9' }, { id: 90, nameCn: '用户信息', nameEn: 'userinfo', type: 'user', orderType: null, url: '/user', sort: '-2' }, { id: 459, nameCn: '销售订单-伽蓝2C（票）-1', nameEn: '销售订单-伽蓝2C（票）-1', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '-1' }, { id: 400, nameCn: '销售订单', nameEn: 'SalesOrder', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '0' }, { id: 401, nameCn: '销售订单0913', nameEn: 'SalesOrder', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '0' }, { id: 403, nameCn: '销售订单09132', nameEn: 'SalesOrder', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '0' }, { id: 428, nameCn: '销售订单zj测试', nameEn: 'SalesOrder', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '0' }, { id: 429, nameCn: '销售订单zj完全匹配', nameEn: 'SalesOrder', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '0' }, { id: 430, nameCn: '销售订单zj列表分割符', nameEn: 'SalesOrder', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '0' }, { id: 431, nameCn: '销售订单zj列表分割符2', nameEn: 'SalesOrder', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '0' }, { id: 449, nameCn: '件订单', nameEn: '件订单', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '0' }, { id: 450, nameCn: '件列表', nameEn: '件列表', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '0' }, { id: 453, nameCn: '销售订单xc', nameEn: 'SalesOrder', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '0' }, { id: 455, nameCn: '销售订单（票）', nameEn: 'SalesOrder', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '0' }, { id: 457, nameCn: '销售订单（件）', nameEn: 'SalesOrder', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '0' }, { id: 458, nameCn: '销售订单-伽蓝2C（票）', nameEn: '销售订单-伽蓝2C（票）', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '0' }, { id: 88, nameCn: 'zj采购订单', nameEn: 'zjpurchaseorder', type: 'order', orderType: 'PURCHASE_ORDER', url: '/order', sort: '1' }, { id: 376, nameCn: '销售订单2C_will', nameEn: '销售订单2C_will', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '1' }, { id: 378, nameCn: '销售订单2C_will2', nameEn: '销售订单2C_will2', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '1' }, { id: 406, nameCn: '采购入库单0914', nameEn: 'InBoundOrder', type: 'order', orderType: 'PURCHASE_ORDER', url: '/order', sort: '1' }, { id: 437, nameCn: '测试销售订单伽蓝2C', nameEn: 'csSalesOrder1115', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '1' }, { id: 438, nameCn: '销售订单-伽蓝2C1207', nameEn: '销售订单-伽蓝2C1207', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '1' }, { id: 439, nameCn: '销售订单-伽蓝2C1207B', nameEn: '销售订单-伽蓝2C1207B', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '1' }, { id: 440, nameCn: '销售订单-伽蓝2C1207C', nameEn: '销售订单-伽蓝2C1207C', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '1' }, { id: 441, nameCn: '销售订单-伽蓝2C1207D', nameEn: '销售订单-伽蓝2C1207D', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '1' }, { id: 443, nameCn: '销售订单-伽蓝2C1208', nameEn: '销售订单-伽蓝2C1208', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '1' }, { id: 94, nameCn: 'zjnew销售订单', nameEn: 'zjnewsaleorder', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '2' }, { id: 320, nameCn: 'zj功能测试', nameEn: 'zj功能测试', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '2' }, { id: 374, nameCn: '测试销售订单11', nameEn: 'csSalesOrder8', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '2' }, { id: 432, nameCn: '测试销售订单1128', nameEn: 'csSalesOrder8', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '2' }, { id: 435, nameCn: '测试销售订单1128B', nameEn: 'csSalesOrder8', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '2' }, { id: 461, nameCn: '测试销售订单0227', nameEn: 'csSalesOrder8', type: 'order', orderType: 'SALE_ORDER', url: '/order', sort: '3' }, { id: 456, nameCn: '入库单0215', nameEn: '入库单0215', type: 'order', orderType: 'PURCHASE_ORDER', url: '/order', sort: '4' }] }, { code: 'inv', nameCn: '库存', nameEn: 'inv', menuList: [{ id: 363, nameCn: '温州弘方', nameEn: '温州弘方', type: 'fjt', orderType: null, url: '/fjt', sort: '2' }, { id: 364, nameCn: '温州弘方2', nameEn: '温州弘方2', type: 'fjt', orderType: null, url: '/fjt', sort: '2' }, { id: 413, nameCn: '库存水位导入', nameEn: 'invThresholdImport', type: 'invThresholdImport', orderType: null, url: '/invThresholdImport', sort: '100' }] }, { code: 'per', nameCn: '绩效', nameEn: 'per', menuList: null }, { code: 'warn', nameCn: '预警', nameEn: 'warn', menuList: [{ id: 142, nameCn: 'zjnew预警', nameEn: 'zjnewwaring', type: 'waring', orderType: 'SALE_ORDER', url: '/waring', sort: '2' }, { id: 148, nameCn: 'zjnew预警2', nameEn: 'zjnewwaring2', type: 'waring', orderType: 'SALE_ORDER', url: '/waring', sort: '2' }, { id: 149, nameCn: 'zjnew预警3', nameEn: 'zjnewwaring3', type: 'waring', orderType: 'SALE_ORDER', url: '/waring', sort: '2' }, { id: 150, nameCn: 'zjnew预警4', nameEn: 'zjnewwaring4', type: 'waring', orderType: 'SALE_ORDER', url: '/waring', sort: '2' }, { id: 151, nameCn: 'zjnew预警4', nameEn: 'zjnewwaring4', type: 'waring', orderType: 'SALE_ORDER', url: '/waring', sort: '2' }, { id: 152, nameCn: 'zjnew预警4', nameEn: 'zjnewwaring4', type: 'waring', orderType: 'SALE_ORDER', url: '/waring', sort: '2' }, { id: 153, nameCn: 'zjnew预警4', nameEn: 'zjnewwaring4', type: 'waring', orderType: 'SALE_ORDER', url: '/waring', sort: '2' }, { id: 154, nameCn: 'zjnew预警4', nameEn: 'zjnewwaring4', type: 'waring', orderType: 'SALE_ORDER', url: '/waring', sort: '2' }, { id: 155, nameCn: 'zjnew预警4', nameEn: 'zjnewwaring4', type: 'waring', orderType: 'SALE_ORDER', url: '/waring', sort: '2' }, { id: 157, nameCn: 'zjnew预警4', nameEn: 'zjnewwaring4', type: 'waring', orderType: 'SALE_ORDER', url: '/waring', sort: '2' }, { id: 169, nameCn: 'zjnew预警194', nameEn: 'zjnewwaring4', type: 'waring', orderType: 'SALE_ORDER', url: '/waring', sort: '2' }, { id: 221, nameCn: 'zjnew工单', nameEn: 'zjnewwaring3', type: 'wo', orderType: 'SALE_ORDER', url: '/wo', sort: '2' }] }, { code: 'workOrder', nameCn: '工单', nameEn: 'workOrder', menuList: [{ id: 245, nameCn: '工单导入', nameEn: 'woImport', type: 'woImport', orderType: null, url: '/woImport', sort: '-1' }, { id: 246, nameCn: '工单处理结果导入', nameEn: 'processImport', type: 'processImport', orderType: null, url: '/processImport', sort: '-1' }, { id: 270, nameCn: '工单控制台nne', nameEn: 'aabb', type: 'wo', orderType: 'SALE_ORDER', url: '/wo', sort: '1' }, { id: 447, nameCn: '工单按钮', nameEn: 'aabb', type: 'wo', orderType: 'SALE_ORDER', url: '/wo', sort: '1' }, { id: 448, nameCn: '工单按钮2', nameEn: 'aabb', type: 'wo', orderType: 'SALE_ORDER', url: '/wo', sort: '1' }, { id: 222, nameCn: 'zjnewwo2', nameEn: 'zjnewwaring3', type: 'wo', orderType: 'SALE_ORDER', url: '/wo', sort: '2' }, { id: 224, nameCn: 'zjnewwo3', nameEn: 'zjnewwaring3', type: 'wo', orderType: 'SALE_ORDER', url: '/wo', sort: '2' }, { id: 225, nameCn: 'zjnewwo4', nameEn: 'zjnewwaring3', type: 'wo', orderType: 'SALE_ORDER', url: '/wo', sort: '2' }, { id: 231, nameCn: '小新的工单1', nameEn: '小新的工单1en', type: 'wo', orderType: 'SALE_ORDER', url: '/wo', sort: '2' }, { id: 260, nameCn: '正行操作台cs', nameEn: 'WorkStation', type: 'wo', orderType: 'SALE_ORDER', url: '/wo', sort: '3' }, { id: 417, nameCn: '正行操作台cs', nameEn: 'WorkStation', type: 'wo', orderType: 'SALE_ORDER', url: '/wo', sort: '3' }, { id: 226, nameCn: '工单测试页', nameEn: 'zjnewwaring3', type: 'wo', orderType: 'SALE_ORDER', url: '/wo', sort: '5' }, { id: 423, nameCn: '杨发测试', nameEn: 'yfceshi', type: 'wo', orderType: 'SALE_ORDER', url: '/wo', sort: '6' }, { id: 422, nameCn: '正行操作台xc', nameEn: 'WorkStation', type: 'wo', orderType: 'SALE_ORDER', url: '/wo', sort: '9' }, { id: 377, nameCn: '工单导入zzcs', nameEn: 'csSalesOrder8', type: 'woImport', orderType: null, url: '/woImport', sort: '100' }] }, { code: 'billOrder', nameCn: '账单计算', nameEn: 'Billing', menuList: [{ id: 258, nameCn: '账单列表正式', nameEn: 'bill', type: 'bill', orderType: 'SALE_ORDER', url: '/bill', sort: '-1' }, { id: 268, nameCn: '对账订单批量导入', nameEn: 'billImport', type: 'billImport', orderType: 'SALE_ORDER', url: '/billImport', sort: '1' }, { id: 407, nameCn: '对账订单列表0916', nameEn: 'BillingSheet', type: 'bill', orderType: 'SALE_ORDER', url: '/bill', sort: '1' }, { id: 365, nameCn: '对账订单审核列表0902', nameEn: 'billApply', type: 'billApply', orderType: 'SALE_ORDER', url: '/billApply', sort: '6' }, { id: 282, nameCn: '对账订单审核批量导入', nameEn: 'billApplyImport', type: 'billApplyImport', orderType: 'SALE_ORDER', url: '/billApplyImport', sort: '10' }, { id: 259, nameCn: '账单预览', nameEn: 'billShow', type: 'billShow', orderType: 'SALE_ORDER', url: '/billShow', sort: '20' }] }, { code: 'report', nameCn: '报表', nameEn: 'report', menuList: [{ id: 33, nameCn: '导出下载', nameEn: 'import', type: 'import', orderType: null, url: '/import', sort: '-1' }] }, { code: 'analyse', nameCn: '智能分析', nameEn: 'analyse', menuList: [{ id: 203, nameCn: 'zj丰景台新消息', nameEn: 'zjfjt', type: 'fjt', orderType: null, url: '/fjt', sort: '2' }] }, { code: 'set', nameCn: '设置', nameEn: 'set', menuList: null }, { code: 'bottom', nameCn: '底部', nameEn: 'bottom', menuList: [{ id: 34, nameCn: '账务中心', nameEn: 'account', type: 'account', orderType: null, url: '/account', sort: '-1' }] }] }),
    )
  }),
]

export const defaultHandlers = []
