"use strict";
// VARIABLES
let buildingType_select = document.getElementById("building-type");
let buildingType =
    buildingType_select.options[buildingType_select.selectedIndex].value;
let estimateNumElv_div = document.querySelector(".estimate-num-elv");
let numApt_input = document
    .getElementById("number-of-apartments")
    .querySelector("input");
let numFloors_input = document
    .getElementById("number-of-floors")
    .querySelector("input");
let numBasements_input = document
    .getElementById("number-of-basements")
    .querySelector("input");
let numElevators_input = document
    .getElementById("number-of-elevators")
    .querySelector("input");
let maxOcc_input = document
    .getElementById("maximum-occupancy")
    .querySelector("input");
let displayCalcElv_input = document
    .getElementById("elevator-amount")
    .querySelector("input");

let productLineSelection_div = document.querySelector(".product-line");
let radioBtns_div = document.querySelector(".radio-btns");
let warning_p = document.getElementById("warning");

let finalPricingDisplay_div = document.querySelector(".final-pricing-display");
let displayUnitPrice_input = document
    .getElementById("elevator-unit-price")
    .querySelector("input");
let displayElvTotalPrice_input = document
    .getElementById("elevator-total-price")
    .querySelector("input");
let displayInstallFee_input = document
    .getElementById("installation-fees")
    .querySelector("input");
let displayEstTotalCost_input = document
    .getElementById("final-price")
    .querySelector("input");

let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});
const buildingTypeFields = {
    residential: [
        "number-of-apartments",
        "number-of-floors",
    ],
    commercial: [
        "number-of-floors",
        "maximum-occupancy",
    ],
    industrial: [
        "number-of-elevators",
    ]
};
const unitPrices = {
    standard: 8000,
    premium: 12000,
    excelium: 15000,
};
const installPercentFees = {
    standard: 10,
    premium: 15,
    excelium: 20,
};

let buildingtab = document.querySelector("#building-type-form"); 
let buildingInfo = document.getElementById("buildingInfo");  
let productLineInfo = document.getElementById("product-line"); 
let pricingblock = document.getElementById('pricing-block');

// CALCULATIONS
function calcResidentialElev(numFloors, numApts) {
    const elevatorsRequired = Math.ceil(numApts / numFloors / 6)*Math.ceil(numFloors / 20);
    console.log(elevatorsRequired)
    return elevatorsRequired;
}
function calcCommercialElev(numFloors, maxOccupancy) {
    const elevatorsRequired = Math.ceil((maxOccupancy * numFloors) / 200)*Math.ceil(numFloors / 10);
    const freighElevatorsRequired = Math.ceil(numFloors / 10);
    return freighElevatorsRequired + elevatorsRequired;
}

function calcInstallFee(totalPrice, installPercentFee) {
    return (installPercentFee / 100) * totalPrice;
}

// DISPLAY
function resetForm() { // FUNCTION TO RESET THE FORM
    estimateNumElv_div.style.display = "none";
    estimateNumElv_div.querySelectorAll("div").forEach((el) => {
        el.querySelectorAll("input[type='number']").forEach((input) => {
            input.value = "";
        });
        el.querySelectorAll("div.col-4").forEach((div) => {
            div.classList.add("d-none");
        });
    });
    displayCalcElv_input.value = "";
    productLineSelection_div.style.display = "none";
    warning_p.style.display = "none";
    productLineSelection_div
        .querySelectorAll("input[type='radio']")
        .forEach((radioBtn) => {
            radioBtn.checked = false;
        });

    finalPricingDisplay_div.style.display = "none";
    finalPricingDisplay_div
        .querySelectorAll("input[type='text']")
        .forEach((input) => {
            input.setAttribute("value", "");
        });
}

function displayBuildingFields(buildingType) { // FUNCTION TO DISPLAY THE FIELD OF THE BUILDING TYPE
    
    estimateNumElv_div.style.display = "block";
    estimateNumElv_div.querySelector(".step-description").style.display =
        "block";
    estimateNumElv_div.querySelector(".card-block").style.display = "block";
    estimateNumElv_div.querySelectorAll(".row").forEach((row) => {
        row.classList.remove("d-none");
    });
    for (let fieldID of buildingTypeFields[buildingType]) {
        estimateNumElv_div
            .querySelector(`div[id='${fieldID}']`)
            .classList.remove("d-none");
    }
    productLineSelection_div.style.display = "block";
    finalPricingDisplay_div.style.display = "block";
    
}

function displayElvCalcResult(buildingType) { // FUNCTION TO DISPLAY THE RESULT OF THE CALCULATION
    let calculatedElv;
    if (buildingType == "commercial") {
        calculatedElv = calcCommercialElev(
            parseInt(numFloors_input.value),
            parseInt(maxOcc_input.value)
        );
        displayCalcElv_input.value = calculatedElv;
    } else if (buildingType == "residential") {
        calculatedElv = calcResidentialElev(
            parseInt(numFloors_input.value),
            parseInt(numApt_input.value)
        );
        displayCalcElv_input.value = calculatedElv;
    } else {
        calculatedElv = numElevators_input.value;
        displayCalcElv_input.value = calculatedElv;
    }
}

function displayPricing(productLine, numElv) { // FUNCTION TO DISPLAY THE PRICING
    let unitPrice = unitPrices[productLine];
    let installPercentFee = installPercentFees[productLine];
    let subtotal = unitPrice * numElv;
    let totalInstallFee = calcInstallFee(subtotal, installPercentFee);
    let totalPrice = subtotal + totalInstallFee;
    displayUnitPrice_input.setAttribute("value", formatter.format(unitPrice));
    displayElvTotalPrice_input.setAttribute(
        "value",
        formatter.format(subtotal)
    );
    displayInstallFee_input.setAttribute(
        "value",
        formatter.format(totalInstallFee)
    );
    displayEstTotalCost_input.setAttribute(
        "value",
        formatter.format(totalPrice)
    );
}

function updatePricingDisplay() { // FUNCTION TO UPDATE THE PRICING DISPLAY
    if (!displayCalcElv_input.value) {
        warning_p.style.display = "block";
        this.checked = false;
    } else {
        let numElv = parseInt(displayCalcElv_input.value);
        warning_p.style.display = "none";
        try {
            let productLine = document.querySelector(
                "input[name='product-line']:checked"
            ).id;
            displayPricing(productLine, numElv);
        } catch {
        }
    }
}

function allBuildingFieldsCompleted(buildingType) { // FUNCTION TO CHECK IF ALL THE FIELDS ARE COMPLETED
    for (let fieldID of buildingTypeFields[buildingType]) {
        if (
            estimateNumElv_div.querySelector(`div[id='${fieldID}'] input`)
                .value == ""
        ) {
            return false;
        }
    }
    return true;
}
function setcolorResidential(){ // FUNCTION TO SET THE COLOR OF TABS IN CASE OF CHOOSE THE RESIDENTIAL BUILDING
    buildingtab.style.backgroundColor = "rgba(10, 101, 160,0.6"; 
    productLineInfo.style.backgroundColor = "rgba(10, 101, 160,0.6"; 
    pricingblock.style.backgroundColor = "rgba(10, 101, 160, 0.6)"; 
    buildingInfo.style.backgroundColor = "rgba(10, 101, 160, 0.6)"; 
}
function setcolorCommercial(){ // FUNCTION TO SET THE COLOR OF TABS IN CASE OF CHOOSE THE COMMERCIAL BUILDING
    buildingtab.style.backgroundColor = "rgba(169, 69, 69, 0.7)";
    productLineInfo.style.backgroundColor = "rgba(169, 69, 69, 0.7)"; 
    pricingblock.style.backgroundColor = "rgba(169, 69, 69, 0.7)"; 
    buildingInfo.style.backgroundColor = "rgba(169, 69, 69, 0.7)"; 
}
function setcolorIndustrial(){ // FUNCTION TO SET THE COLOR OF TABS IN CASE OF CHOOSE THE INDUSTRIAL BUILDING
       buildingtab.style.backgroundColor = "rgba(211, 211, 211, 0.8)";
       productLineInfo.style.backgroundColor = "rgba(211, 211, 211, 0.8)"; 
       pricingblock.style.backgroundColor = "rgba(211, 211, 211, 0.8)"; 
       buildingInfo.style.backgroundColor = "rgba(211, 211, 211, 0.8)"; 
}

// ACTIONS
radioBtns_div.querySelectorAll("input[type='radio']").forEach((radioBtn) => {
    radioBtn.addEventListener("click", updatePricingDisplay);
});

buildingType_select.addEventListener("change", function () {
    resetForm();
    
    buildingType = this.value;
    
    if (buildingType == "---Select---") {
        resetForm();
    } 
    else {
        
        if (buildingType == "residential") {
        setcolorResidential();
        displayBuildingFields(buildingType);
        estimateNumElv_div.addEventListener("change", function () {
            if (!allBuildingFieldsCompleted(buildingType)) {
                return;
            } else {
                displayElvCalcResult(buildingType);
                updatePricingDisplay();
            }
        });
    }
        else if (buildingType == "commercial") {
            setcolorCommercial();
            displayBuildingFields(buildingType);
            // buildingtab.style.backgroundColor = "rgba(169, 69, 69, 0.7)";
            // productLineInfo.style.backgroundColor = "rgba(169, 69, 69, 0.7)"; /// linea color prueba
            // pricingblock.style.backgroundColor = "rgba(169, 69, 69, 0.7)"; /// linea color prueba
            // buildingInfo.style.backgroundColor = "rgba(169, 69, 69, 0.7)"; /// linea color prueba
            estimateNumElv_div.addEventListener("change", function () {
                if (!allBuildingFieldsCompleted(buildingType)) {
                    return;
                } else {
                    displayElvCalcResult(buildingType);
                    updatePricingDisplay();
                }
            });
        }
        else if (buildingType == "industrial") {
            
            setcolorIndustrial();
            // buildingtab.style.backgroundColor = "rgba(211, 211, 211, 0.8)";
            // productLineInfo.style.backgroundColor = "rgba(211, 211, 211, 0.8)"; /// linea color prueba
            // pricingblock.style.backgroundColor = "rgba(211, 211, 211, 0.8)"; /// linea color prueba
            // buildingInfo.style.backgroundColor = "rgba(211, 211, 211, 0.8)"; /// linea color prueba
            displayBuildingFields(buildingType);
            estimateNumElv_div.addEventListener("change", function () {
                if (!allBuildingFieldsCompleted(buildingType)) {
                    return;
                } else {
                    displayElvCalcResult(buildingType);
                    updatePricingDisplay();
                }
            });
        }
    }
});
