export async function handleFormSubmit(event,url) {
    event.preventDefault();
    const data = serializeForm(event.target);
    return await sendData(data,url)
}
function serializeForm(formNode) {
    return new FormData(formNode)
}

async function sendData(data,url) {
    return await fetch(url, {
        method: 'POST',
        body: data,
    })
}