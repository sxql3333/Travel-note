export function GetRedirect(type,header){
    let path
    if (type ==="laoban"){
        path="/laoban"
    }
    else{
        path="/dashen"
    }
    if (!header){
        path=path+'info'
    }
    return path;
}