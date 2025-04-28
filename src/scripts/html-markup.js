const commonElements = {
    matterportIframe: document.querySelector('#matterport-iframe'),
    createTaskButton: document.querySelector('#create-task-button'),
    tagControlContainer: document.querySelector('.tag-control-container'),
    tagControlContainerBg: document.querySelector('.tag-control-container .bg'),
}

const clerk = {
    signInModal: document.querySelector('#clerk-sign-in-modal'),
    userButton: document.querySelector('#clerk-user-button'),
}


export const htmlMarkup = {
    commonElements,
    clerk
}
