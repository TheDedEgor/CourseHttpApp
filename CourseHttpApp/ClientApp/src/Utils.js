export async function handleFormSubmit(event,url) {
    event.preventDefault();
    const data = serializeForm(event.target);
    return await sendData(data,url)
}
function serializeForm(formNode) {
    return new FormData(formNode)
}

async function sendData(data,url) {
    const token = sessionStorage.getItem("access_token")
    return await fetch(url, {
        method: 'POST',
        body: data,
        headers:{
            "Authorization": "Bearer " + token
        }
    })
}