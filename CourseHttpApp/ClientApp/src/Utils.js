import {Form} from "reactstrap";

export async function handleFormSubmit(event, url) {
    event.preventDefault();
    const data = serializeForm(event.target);
    return await sendData(data, url)
}

function serializeForm(formNode) {
    return new FormData(formNode)
}

async function sendData(data, url) {
    const token = sessionStorage.getItem("access_token")
    return await fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            "Authorization": "Bearer " + token
        }
    })
}

export function resizeWindow() {
    const active = document.querySelector(".header-menu .menu-item.active");
    const target = document.querySelector(".target");

    if (active) {
        const left = active.getBoundingClientRect().left + window.pageXOffset;
        const top = active.getBoundingClientRect().top + window.pageYOffset;

        target.style.left = `${left}px`;
        target.style.top = `${top}px`;
    }
}
const checkValidJson = (text) => {
    if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        return true;
    }else{
        return false;
    }
}

export const checkParams = (formData,jsonText,paramData,headerData,setErrorMessage) =>{
    if(!formData.url){
        setErrorMessage('Request URL is Missing')
        return false;
    }
    if(!checkValidJson(jsonText)){
        setErrorMessage('Text is not valid json')
        return false
    }
    return true
}

export const getHeaderAndParams = (objArr) =>{
    let obj = {}
    objArr.forEach(data => {
        if(data.hasOwnProperty('check') && data.check){
            obj = {...obj,[data.key]:data.value}
        }
    })
    return obj
}