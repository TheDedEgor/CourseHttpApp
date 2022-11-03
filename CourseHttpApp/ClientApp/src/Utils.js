import {Form} from "reactstrap";
import {createTheme} from "@uiw/codemirror-themes";
import {tags as t} from "@lezer/highlight";

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
        setErrorMessage('URL-адрес запроса отсутствует')
        return false;
    }
    if(!checkValidJson(jsonText)){
        setErrorMessage('Недопустимый текст json')
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
export const myTheme = createTheme({
    theme: 'light',
    settings: {
        background: '#ffffff',
        foreground: '#75baff',
        caret: '#5d00ff',
        selection: '#036dd626',
        selectionMatch: '#036dd626',
        lineHighlight: '#8a91991a',
        gutterBackground: '#fff',
        gutterForeground: '#8a919966',
    },
    styles: [
        { tag: t.comment, color: '#787b8099' },
        { tag: t.variableName, color: '#0080ff' },
        { tag: [t.string, t.special(t.brace)], color: '#5c6166' },
        { tag: t.number, color: '#5c6166' },
        { tag: t.bool, color: '#5c6166' },
        { tag: t.null, color: '#5c6166' },
        { tag: t.keyword, color: '#5c6166' },
        { tag: t.operator, color: '#5c6166' },
        { tag: t.className, color: '#5c6166' },
        { tag: t.definition(t.typeName), color: '#5c6166' },
        { tag: t.typeName, color: '#5c6166' },
        { tag: t.angleBracket, color: '#5c6166' },
        { tag: t.tagName, color: '#5c6166' },
        { tag: t.attributeName, color: '#5c6166' },
    ],
});