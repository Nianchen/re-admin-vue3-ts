/*
 * @Author: yjl
 * @Date: 2023-04-14 15:48:48
 * @LastEditors: yjl
 * @Description: useTable
 */
import { reactive, toRefs } from 'vue'
interface Pagination {
  currentPage: number
  pageSize: number
  total: number
  showTotal?: any
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  pageSizeOptions?: Array<string>
}
interface tableParams {
  pagination: Pagination
  tableData: any[]
  seachParams: object
}
/**
 * 封装需求
 * 1.返回一个tableData
 * 2.返回一个分页
 * 3.返回一个查询tableData的方法
 * 4.返回一个分页change方法
 * 5.返回一个分页大小change方法
 * 6.返回一个reset方法
 * 7.返回一个seach方法
 * 8.返回一个seachParam的对象
 * 9.返回一个可设置tableData的方法
 */
/**
 *  参数说明
 * @param api 请求接口的api(必传)
 * @param initParams 初始化默认参数(非必填)
 * @param callBack 拿到数据后的回调方法方便处理数据
 * @returns
 */
export const useTable = (
  api: (param: any) => Promise<any>,
  initParams: object = {},
  callBack?: Function,
) => {
  const state = reactive<tableParams>({
    pagination: {
      currentPage: 1,
      pageSize: 10,
      total: 0,
    },
    tableData: [],
    seachParams: {},
  })
  //请求table数据
  function queryTableData() {
    const postData = {
      ...state.pagination,
      ...state.seachParams,
      ...initParams,
    }
    return api(postData).then((res) => {
      //如果要处理返回数据的话
      callBack && (res = callBack(res))
      // 复制给table
      state.tableData = res.currentPageData
      // 赋值总数
      state.pagination.total = res.totalCount
      return res
    })
  }
  //分页change
  function handPageChange(page:any) {
    state.pagination.currentPage = page
    queryTableData()
  }
  //分页大小change
  function handPageSizeChange(current:any, size:any) {
    console.log(size)
    state.pagination.pageSize = size
    queryTableData()
  }
  //搜索
  function handSeach() {
    state.pagination.currentPage = 1
    queryTableData()
  }
  //重置搜索
  function reset() {
    state.pagination.currentPage = 1
    state.seachParams = {}
    queryTableData()
  }
  function setTableData(data: any[]) {
    state.tableData = data
  }
  return {
    ...toRefs(state),
    handPageChange,
    queryTableData,
    handSeach,
    handPageSizeChange,
    reset,
    setTableData,
  }
}

