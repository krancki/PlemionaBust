let workBtn;
let bustContent;


const currentState = [];


document.addEventListener("DOMContentLoaded", function (event) {

    bustContent = document.getElementById("bustContent");
    refreshBtn = document.getElementById("refreshBtn");
    refreshBtn.addEventListener('click', findAllEngine);

});


const addTab = (id) => {

    const bustStatus = {
        id: id,
        checkboxA: false,
        checkboxB: false,
        isWorking: false,
    };

    currentState.push(bustStatus);
    createBustElement(id);
};


createBustElement = () => {
    console.log("create");
    while (bustContent.firstChild) {
        bustContent.removeChild(bustContent.firstChild);
    }
    currentState.forEach((value, index) => {

        const bustBlock = document.createElement("div");

        const textA = document.createElement('span');

        const checkboxA = document.createElement("input");
        const textB = document.createElement('span');
        const checkboxB = document.createElement("input");
        const workBtn = document.createElement("input");
        const bustInfo = document.createElement("p");
        const removeBlock = document.createElement("input");

        textA.innerText = "A";
        textB.innerText = "B";


        bustBlock.setAttribute("class", "bust_block");
        bustInfo.setAttribute("class", "bustInfo");

        checkboxA.setAttribute("type", "checkbox");
        checkboxB.setAttribute("type", "checkbox");
        workBtn.setAttribute("type", "button");
        removeBlock.setAttribute("type", "button");

        removeBlock.setAttribute("value", "remove");
        removeBlock.addEventListener('click', () => {

            bustBlock.remove();
        });

        checkboxA.setAttribute("value", "armyA");
        checkboxA.checked = value.checkboxA;
        checkboxA.addEventListener("click", function () {
            value.checkboxA = this.checked;
        });


        checkboxB.setAttribute("value", "armyB");
        checkboxB.checked = value.checkboxB;
        checkboxB.addEventListener("click", function () {
            value.checkboxB = this.checked;
        });
        workBtn.setAttribute("value", "On");
        workBtn.addEventListener("click", function () {
            if (this.value === "On") {
                sendToEngine(index);
                this.value = "Off";
            } else {
                this.value = "On";
            }

        });


        bustBlock.appendChild(textA);
        bustBlock.appendChild(checkboxA);
        bustBlock.appendChild(textB);
        bustBlock.appendChild(checkboxB);
        bustBlock.appendChild(workBtn);
        bustBlock.appendChild(bustInfo);
        bustBlock.appendChild(removeBlock);

        bustContent.appendChild(bustBlock);
    });
};


const findTab = (id) => {

    let found = false;
    for (let i = 0; i < currentState.length; i++) {
        if (currentState[i].id === id) {
            found = true;
            break;
        }
    }
    return found;
};

const removeTab = (index) => {
    currentState.splice(index, 1);
    createBustElement();
};

const cleanState = () => {
    currentState.splice(0, currentState.length);
};


const sendToEngine = (currentStateIndex) => {

    chrome.tabs.query({}, function (tabs) {
        console.log("Wysyłam: ", currentState[currentStateIndex]);
        for (let i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, {bustStatus: currentState[currentStateIndex]});
        }
    }, function (response) {
        if (!chrome.runtime.lastError) {
            if (!findTab(response.bustId)) {
                addTab(response.bustId);
            }
        }
    });


};

const findAllEngine = () => {

    chrome.tabs.query({}, function (tabs) {

        for (let i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, {broadcast: true}, function (response) {
                if (!chrome.runtime.lastError) {
                    if (!findTab(response.bustId)) {
                        addTab(response.bustId);
                    }
                }
            });

        }
    });
};


chrome.runtime.onMessage.addListener(
    function ({broadcast, windowId}, {tab}) {

        if (tab) {
            if (broadcast && !findTab(windowId)) {
                addTab(windowId);
                console.log(currentState);
            }
        }
        console.log('status:', currentState);
    });


