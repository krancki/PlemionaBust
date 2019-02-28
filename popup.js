let workBtn;
let currentState = {
    'activeTabs': [],

};

document.addEventListener("DOMContentLoaded", function (event) {


    workBtn = this.getElementById("workBtn");
    //workBtn.addEventListener("click", sendData);
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

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (sender.tab) {
            if(!currentState.activeTabs.includes(sender.tab.id)){
                console.log(request.broadcast);
                if(request.broadcast){
                currentState.activeTabs.push(sender.tab.id);
                }else{
                    console.log("remove");
                   let index = currentState.activeTabs.indexOf(sender.tab.id);
                   currentState.activeTabs.splice(index,1);
                }
            }

        }
        console.log('status:',currentState);
    });


findAllOpenTabs=()=>{

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {'bustScan': true}, function(response) {
            if (chrome.runtime.lastError) {
            console.log("There is no tabs");
            }else if( response&& response.currentTab ) {
                if(!currentState.activeTabs.includes(response.currentTab.id)){
                    currentState.activeTabs.push(response.currentTab.id);
                    console.log(currentState);
                }
            }
        });
    });

}
