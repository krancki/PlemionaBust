let workBtn;
let bustContent;
const currentState = {
    'activeTabs': [],

};

document.addEventListener("DOMContentLoaded", function (event) {

    bustContent = document.getElementById("bustContent");
    refreshBtn = document.getElementById("refreshBtn");
    refreshBtn.addEventListener('click',createBustElement);

});


/*
const sendData = ()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
            console.log(response.farewell);
        });
    });
};
*/



createBustElement =()=>{
 console.log("create");
    while(bustContent.firstChild){
        bustContent.removeChild(bustContent.firstChild);
    }
    currentState.activeTabs.forEach(value => {

    const bustBlock= document.createElement("div");

    const textA= document.createElement('span');;
    const checkboxA= document.createElement("input");
    const textB = document.createElement('span');
    const checkboxB= document.createElement("input");
    const workBtn= document.createElement("input");
    const bustInfo = document.createElement("p");
    const removeBlock = document.createElement("input");

    textA.innerText="A";
    textB.innerText="B";


    bustBlock.setAttribute("class","bust_block");
    bustInfo.setAttribute("class","bustInfo");

    checkboxA.setAttribute("type","checkbox");
    checkboxB.setAttribute("type","checkbox");
    workBtn.setAttribute("type","button");
    removeBlock.setAttribute("type","button");
    removeBlock.setAttribute("value","remove");

    removeBlock.addEventListener('click',()=>{
        bustBlock.remove();
    });

    checkboxA.setAttribute("value","armyA");
    checkboxB.setAttribute("value","armyB");
    workBtn.setAttribute("value","On");
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

chrome.runtime.onMessage.addListener(
    function ({broadcast}, {tab}) {

        if (tab) {
            if(!currentState.activeTabs.includes(tab.id)){
                console.log(broadcast);
                if(broadcast){
                currentState.activeTabs.push(tab.id);
                    if(!currentState.activeTabs.includes(tab.id)){
                        currentState.activeTabs.push(tab.id);
                        console.log(currentState);
                        createBustElement(tab.id);
                    }
                }else{
                    console.log("remove");
                   let index = currentState.activeTabs.indexOf(tab.id);
                   currentState.activeTabs.splice(index,1);
                }
            }

        }
        console.log('status:',currentState);
    });




