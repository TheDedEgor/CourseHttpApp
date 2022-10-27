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