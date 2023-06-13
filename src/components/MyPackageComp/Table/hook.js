import { ref, reactive, toRefs, watch } from 'vue'
 
export const usePageReq = (api, otherParams) => {
// 分页的页数和一页的大小
    const pageParams = reactive({
        pageNumber: 1,
        pageSize: 10
    })
    const datas = ref([])
 
    const getPage = () => {
        let apiOtherParams = {}
        
        // 处理传过来的参数
        Object.keys(otherParams).forEach(key => {
            let targeParams = otherParams[key]
            if(typeof targeParams === 'object') {
                Object.assign(apiOtherParams, targeParams)
            } else {
                // 日期参数date的话，而且数组说明是dateRange，参数才分为start和end, date:[]
                if(key === 'date' && Array.isArray(targeParams)) {
                    apiOtherParams['start'] = targeParams[0]
                    apiOtherParams['end'] = targeParams[1]
                } else {
                    apiOtherParams[key] = targeParams
                }
            }
        })
 
        // 发起请求即可。
        reqFn({
        //请求参数,这里取决于你的接口需要什么参数
            ...apiOtherParams,
            ...pageParams
        }).then(res=> {
        // 这里接收你的请求结果，有什么数据需要获取都写在这里
            datas.value = res.data.content
        })
    }
 
    watch(() => pageParams.pageNumber, (newVal) => {
        getPage()
    })
 
    watch(() => pageParams.pageSize, (newVal) => {
        getPage()
    })
 
    // 刷新表格再次请求
    const search = () => {
        pageParams.pageNumber = 1
        getPage()
    }
 
// 对外面返回你的参数，想返回什么写什么
    return {
        datas,
        ...toRefs(pageParams),
        getPage,
        search
    }
}