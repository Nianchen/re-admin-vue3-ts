GetUserlist()


let Userlist = await GetUserlist()

let UserList = []

GetUserlist().then(res=>{
    UserList.push(...res.data)
})