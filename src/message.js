require('./style/message.scss')

const htmltext = require('./template/message.html');

const defaultOption = {
    tagName: "live2d-message-dialog",
    left: false
};

let RootElement;

let loading = true;

let ElementLinks;

function autoFitMessage() {
    ElementLinks.main.style.height = ElementLinks.message.clientHeight + 'px';
    ElementLinks.main.style.width = ElementLinks.message.clientWidth + 'px';
}

function loadMessageDialog(targetID, option) {
    option = Object.assign({}, defaultOption, option)
    RootElement = document.createElement(option.tagName);
    if (option.left) {
        RootElement.classList.add("l2m-left");
    }
    RootElement.innerHTML = htmltext;
    ElementLinks = {
        message: RootElement.getElementsByClassName("l2m-message")[0],
        main: RootElement.getElementsByClassName("l2m-main")[0],
        loading: RootElement.getElementsByClassName("l2m-loading")[0],
        messageBox: RootElement.getElementsByClassName("l2m-message-box")[0],
        messageDate: RootElement.getElementsByClassName("l2m-message-date")[0],
        sendMessage: RootElement.getElementsByClassName("l2m-send-button")[0],
        messageInput: RootElement.getElementsByClassName("l2m-message-input")[0]
    }
    ElementLinks.loading.addEventListener("click", handleClickLoading);
    ElementLinks.sendMessage.addEventListener("click", handleClickSendMessage);
    const target = document.getElementById(targetID);
    target.appendChild(RootElement);
}

function hiddenLoading() {
    ElementLinks.loading.classList.add("l2m-hidden");
    ElementLinks.messageBox.classList.remove("l2m-hidden");
    loading = false;
    autoFitMessage();
}

function Loading() {
    ElementLinks.loading.classList.remove("l2m-hidden");
    ElementLinks.messageBox.classList.add("l2m-hidden");
    loading = true;
    ElementLinks.main.style.height = '';
    ElementLinks.main.style.width = '';
}

function handleClickLoading() {
    if (loading) {
        hiddenLoading();
    }
}

function handleClickSendMessage() {
    let input = ElementLinks.messageInput.value.replace(/(^\s*)|(\s*$)/g,"");
    ElementLinks.messageInput.value = "";
    if (input && input != "") {
        ElementLinks.messageDate.innerText = "You say: " + input;
        autoFitMessage();
    }
}

window.loadMessageDialog = loadMessageDialog;