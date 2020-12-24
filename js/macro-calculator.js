//event listeners
document.getElementById('myBodyWeight').addEventListener('input', main);
document.getElementById('myMeals').addEventListener('input', main);
document.getElementById('myCalories').addEventListener('input', main);
document.getElementById('proteinPerPound').addEventListener('input', main);
document.getElementById('carbsPerPound').addEventListener('input', main);
document.getElementById('fatPerPound').addEventListener('input', main);


//functions

function calculateCarbsFromCalories (myBodyWeight, myCalories, myMeals, proteinCalories, fatCalories) {
    let carbsCalories = myCalories - (proteinCalories + fatCalories);
    let totalCarbs = carbsCalories / 4;
    let carbsPerPound = totalCarbs / myBodyWeight;
    let carbsCaloriesPerMeal = carbsCalories / myMeals;
    let carbsGramsPerMeal = totalCarbs / myMeals;

    document.getElementById('carbsPerPound').value = carbsPerPound;
    document.getElementById('carbsTotal').value = totalCarbs;
    document.getElementById('carbsCalories').value = carbsCalories;
    document.getElementById('carbsCaloriesPerMeal').value = carbsCaloriesPerMeal;
    document.getElementById('carbsGramsPerMeal').value = carbsGramsPerMeal;

    return carbsCalories;
}

function calculateMacros (myBodyWeight, myMeals, macroPerPound, macroToCal, macroName) {
    let totalMacro = macroPerPound * myBodyWeight;
    let macroCalories = totalMacro * macroToCal;
    let macroCaloriesPerMeal = macroCalories / myMeals;
    let macroGramsPerMeal = totalMacro / myMeals;

    document.getElementById(macroName + 'Total').value = totalMacro;
    document.getElementById(macroName + 'Calories').value = macroCalories;
    document.getElementById(macroName + 'CaloriesPerMeal').value = macroCaloriesPerMeal;
    document.getElementById(macroName + 'GramsPerMeal').value = macroGramsPerMeal;

    return macroCalories;
}


function displayResults (event) {
    let myBodyWeight;
    let myMeals;
    let proteinPerPound;
    let carbsPerPound;
    let fatPerPound;
    const proteinToCal = 4;
    const carbToCal = 4;
    const fatToCal = 9;

    if (event.target.id === 'myBodyWeight') {        
        myBodyWeight = event.target.value;
        myMeals = document.getElementById('myMeals').value;
        proteinPerPound = document.getElementById('proteinPerPound').value;
        carbsPerPound = document.getElementById('carbsPerPound').value;
        fatPerPound = document.getElementById('fatPerPound').value;
        console.log(proteinPerPound);
    } else if (event.target.id === 'myMeals') {
        myBodyWeight = document.getElementById('myBodyWeight').value;
        myMeals = event.target.value;
        proteinPerPound = document.getElementById('proteinPerPound').value;
        carbsPerPound = document.getElementById('carbsPerPound').value;
        fatPerPound = document.getElementById('fatPerPound').value;
    } else if (event.target.id === 'proteinPerPound') {
        myBodyWeight = document.getElementById('myBodyWeight').value;
        myMeals = document.getElementById('myMeals').value;
        proteinPerPound = event.target.value;
        carbsPerPound = document.getElementById('carbsPerPound').value;
        fatPerPound = document.getElementById('fatPerPound').value;
    } else if (event.target.id === 'carbsPerPound') {
        myBodyWeight = document.getElementById('myBodyWeight').value;
        myMeals = document.getElementById('myMeals').value;
        proteinPerPound = document.getElementById('proteinPerPound').value;
        carbsPerPound = event.target.value;
        fatPerPound = document.getElementById('fatPerPound').value;
    } else if (event.target.id === 'fatPerPound') {
        myBodyWeight = document.getElementById('myBodyWeight').value;
        myMeals = document.getElementById('myMeals').value;
        proteinPerPound = document.getElementById('proteinPerPound').value;
        carbsPerPound = document.getElementById('carbsPerPound').value;
        fatPerPound = event.target.value;
    }

    let proteinCalories = calculateMacros (myBodyWeight, myMeals, proteinPerPound, proteinToCal, 'protein');
    let carbsCalories = calculateMacros (myBodyWeight, myMeals, carbsPerPound, carbToCal,'carbs');
    let fatCalories = calculateMacros (myBodyWeight, myMeals, fatPerPound, fatToCal,'fat');

    let totalCalories = proteinCalories + carbsCalories + fatCalories;

    document.getElementById('totalCalories').value = totalCalories;
}

function displayResultsByCalories (event) {
    let myBodyWeight = document.getElementById('myBodyWeight').value;
    let myCalories = document.getElementById('myCalories').value;
    let myMeals = document.getElementById('myMeals').value;
    let proteinPerPound = document.getElementById('proteinPerPound').value;
    let carbsPerPound = document.getElementById('carbsPerPound').value;
    let fatPerPound = document.getElementById('fatPerPound').value;

    const proteinToCal = 4;
    const fatToCal = 9;

    let proteinCalories = calculateMacros (myBodyWeight, myMeals, proteinPerPound, proteinToCal, 'protein');
    let fatCalories = calculateMacros (myBodyWeight, myMeals, fatPerPound, fatToCal,'fat');
    let carbsCalories = calculateCarbsFromCalories (myBodyWeight, myCalories, myMeals, proteinCalories, fatCalories);
    let totalCalories = proteinCalories + carbsCalories + fatCalories;

    document.getElementById('totalCalories').value = totalCalories;
}

function main (event) {
    if (document.getElementById('selectTargetCalories').checked === true) {
        displayResultsByCalories(event);
        // console.log('not yet active');
    } else {
        displayResults(event);
    }
}