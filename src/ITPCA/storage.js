const user_name = 'user'
function setstorage(value) {
    if (!value || typeof value === 'function') {
        console.log('数据保存失败', value);
        return
    }
    else{
        localStorage.setItem(user_name,JSON.stringify(value))
    }
}

function getstorage(){
    const user=localStorage.getItem(user_name);
    if(!user){
        return
    }
    return JSON.parse(user)

}
function remStorage(){
    localStorage.removeItem();
}

export {
    setstorage,
    getstorage,
    remStorage
}