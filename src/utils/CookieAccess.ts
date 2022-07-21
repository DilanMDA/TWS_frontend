export function setCookie(name:string, value:string | number | boolean, daysToLive?:number){
    let cookie = `${name}=${encodeURIComponent(value)};`;
    if(daysToLive){
        cookie = `${cookie} max-age=${daysToLive*24*60*60}`;
    }
    document.cookie = cookie;
}

export function getCookie(name:string):string | number | boolean | null {
    const cookieArr = document.cookie.split(';');
    let value:string | number | boolean | null = null;
    
    cookieArr.map(v => {
        const cookiePair = v.split('=');
        if(name === cookiePair[0].trim()){
            value = decodeURIComponent(cookiePair[1])
        }
    })

    return value;
}

export function deleteCookie(name:string) {
    const cookie = `${name}=; max-age=0`;
    document.cookie = cookie;
}