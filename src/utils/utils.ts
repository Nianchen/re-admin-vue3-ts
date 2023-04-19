//格式化时间
function format(date:Date){
    //获取年月日，时间
    const year = date.getFullYear();
    const mon = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    const data = date.getDate()  < 10 ? "0"+(date.getDate()) : date.getDate();
    const hour = date.getHours()  < 10 ? "0"+(date.getHours()) : date.getHours();
    const min =  date.getMinutes()  < 10 ? "0"+(date.getMinutes()) : date.getMinutes();
    const seon = date.getSeconds() < 10 ? "0"+(date.getSeconds()) : date.getSeconds();
                 
    const newDate = year +"-"+ mon +"-"+ data +" "+ hour +":"+ min +":"+ seon;
    return newDate;
}


export {
    format
}