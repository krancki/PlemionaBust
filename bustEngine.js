



document.onreadystatechange = function () {
    if (document.readyState === "complete") {

        setInterval(()=>{chrome.runtime.sendMessage({broadcast:"true"});},1000);

    }
};

window.onbeforeunload=function(event) {
    chrome.runtime.sendMessage({broadcast:"false"})
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        if (!sender.tab) {
            if (request.bustScan)
                sendResponse({'currentTab':1});
        }


    });

army = {
    "spear": 0,
    "sword": 0,
    "axe": 0,
    "archer": 0,
    "spy": 0,
    "light": 0,
    "marcher": 0,
    "heavy": 0,
    "knight": 0,
    "spearSpeed": 1080,
    "swordSpeed": 1320,
    "axeSpeed": 1080,
    "archerSpeed": 1080,
    "spySpeed": 540,
    "lightSpeed": 600,
    "marcherSpeed": 600,
    "heavySpeed": 660,
    "knightSpeed": 600,
    armyReturn: function (obj) {
        this.spear += obj.spear;
        this.sword += obj.sword;
        this.axe += obj.axe;
        this.archer += obj.archer;
        this.spy += obj.spy;
        this.light += obj.light;
        this.marcher += obj.marcher;
        this.heavy += obj.heavy;
    },
    armyAttack: function (obj) {
        this.spear -= obj.spear;
        this.sword -= obj.sword;
        this.axe -= obj.axe;
        this.archer -= obj.archer;
        this.spy -= obj.spy;
        this.light -= obj.light;
        this.marcher -= obj.marcher;
        this.heavy -= obj.heavy;
    },

    checkAvailability: function (obj) {
        if (
            this.spear >= obj.spear &&
            this.sword >= obj.sword &&
            this.axe >= obj.axe &&
            this.archer >= obj.archer &&
            this.spy >= obj.spy &&
            this.light >= obj.light &&
            this.marcher >= obj.marcher &&
            this.heavy >= obj.heavy) {
            return true;
        };
        return false;
    },
    slowestUnit: function (obj) {
        let speed = 0;
        speed = obj.spy > 0 ? this.spySpeed : speed;
        speed = obj.light > 0 ? this.lightSpeed : speed;
        speed = obj.marcher > 0 ? this.marcherSpeed : speed;
        speed = obj.knight > 0 ? this.knightSpeed : speed;
        speed = obj.heavy > 0 ? this.heavySpeed : speed;
        speed = obj.spear > 0 ? this.spearSpeed : speed;
        speed = obj.axe > 0 ? this.axeSpeed : speed;
        speed = obj.archer > 0 ? this.archerSpeed : speed;
        speed = obj.sword > 0 ? this.swordSpeed : 1320;

        return speed;
    }


};

armyA = {
    "spear": 0,
    "sword": 0,
    "axe": 0,
    "archer": 0,
    "spy": 0,
    "light": 0,
    "marcher": 0,
    "heavy": 0,
    "knight": 0
};

armyB = {
    "spear": 0,
    "sword": 0,
    "axe": 0,
    "archer": 0,
    "spy": 0,
    "light": 0,
    "marcher": 0,
    "heavy": 0,
    "knight": 0
};


let btnArrayA;
let btnArrayB;
let isWorking = false;

const config ={
    'id':null,
    'active':1,
    'intervalSpeed' : 200,
    'isWorking': false
};


let bustInfo = null;


let interval = null;

let captchaFound = false;

loadArmy = () => {

    army.spear = parseInt(document.getElementById("spear").innerText);
    army.sword = parseInt(document.getElementById("sword").innerText);
    army.axe = parseInt(document.getElementById("axe").innerText);
    army.archer = parseInt(document.getElementById("archer").innerText);
    army.spy = parseInt(document.getElementById("spy").innerText);
    army.light = parseInt(document.getElementById("light").innerText);
    army.marcher = parseInt(document.getElementById("marcher").innerText);
    army.heavy = parseInt(document.getElementById("heavy").innerText);
    army.knight = parseInt(document.getElementById("knight").innerText);
    armyA.spear = parseInt(document.getElementsByName("spear")[0].value);
    armyA.sword = parseInt(document.getElementsByName("sword")[0].value);
    armyA.axe = parseInt(document.getElementsByName("axe")[0].value);
    armyA.archer = parseInt(document.getElementsByName("archer")[0].value);
    armyA.spy = parseInt(document.getElementsByName("spy")[0].value);
    armyA.light = parseInt(document.getElementsByName("light")[0].value);
    armyA.marcher = parseInt(document.getElementsByName("marcher")[0].value);
    armyA.heavy = parseInt(document.getElementsByName("heavy")[0].value);
    armyA.knight = parseInt(document.getElementsByName("knight")[0].value);
    armyB.spear = parseInt(document.getElementsByName("spear")[1].value);
    armyB.sword = parseInt(document.getElementsByName("sword")[1].value);
    armyB.axe = parseInt(document.getElementsByName("axe")[1].value);
    armyB.archer = parseInt(document.getElementsByName("archer")[1].value);
    armyB.spy = parseInt(document.getElementsByName("spy")[1].value);
    armyB.light = parseInt(document.getElementsByName("light")[1].value);
    armyB.marcher = parseInt(document.getElementsByName("marcher")[1].value);
    armyB.heavy = parseInt(document.getElementsByName("heavy")[1].value);
    armyB.knight = parseInt(document.getElementsByName("knight")[1].value);
    btnArrayA = document.getElementsByClassName("farm_icon farm_icon_a");
    btnArrayB = document.getElementsByClassName("farm_icon farm_icon_b");
    btnArrayA[0].remove();
    btnArrayB[0].remove();


};



armyAReturn = () => {
    army.armyReturn(armyA);
};

armyBReturn = () => {
    army.armyReturn(armyB);
};

armyAAttack=()=>{
    army.armyAttack(armyA);
};
armyBAttack=()=>{
    army.armyAttack(armyB);
};

captchaFound=()=>{

    let captcha = document.getElementsByClassName("");

    if(captcha!=null) captchaFound = true;

};
const TIMEPATTERN = 2 * 60 * 1000;

let i = 1;
manager = () => {



    if (army.checkAvailability(armyA) && !captchaFound() ) {


        let distance = parseInt(document.getElementsByClassName("farm_icon farm_icon_b")[i].parentNode.parentNode.getElementsByTagName("td")[7].innerText);
        let attackTime = (distance * army.slowestUnit(armyA)) * TIMEPATTERN;

        console.log(attackTime);
        armyAAttack();
        this.setTimeout(armyAReturn, attackTime);

        btnArrayA[i].click();


        for (let j = 1; j < btnArrayA.length; j++) {
            btnArrayA[j].classList.remove("done");
            btnArrayA[j].classList.remove("farm_icon_disabled");
        }

        i++;
    }


    if (i >= btnArrayA.length) {
        i = 1;
    }

};


useBust = () => {


    if (interval!=null) {
        this.clearInterval(interval);
        interval=null;
        isWorking = false;
        //self.value = "Off";
    } else {
        interval = setInterval(manager, 350);
        isWorking = true;
       // self.value = "On";
    }

};




