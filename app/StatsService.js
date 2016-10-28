import domService from './DomService';

let container = null;
let alert = null;
let genderSelect = null;
let weightInput = null;
let goalSelect = null;
let continueButton = null;

class StatsService {

	render(appContainer) {
        container = domService.createRow();
        let column = domService.createColumn(12, 6);

        renderAlert(column);
        renderGenderSelect(column);
        renderWeightInput(column);
        renderGoalSelect(column);
        renderContinueButton(column);

        container.appendChild(column);
        appContainer.appendChild(container);
	}

	hide() {
        container.style.display = 'none';
    }

    show() {
        container.style.display = '';
    }

    continueClick(callback) {
        continueButton.onclick = () => {
            callback(getValues());
        }
    }
}

function renderAlert(column) {
    alert = domService.createAlert('Please complete the highlighted fields');
    column.appendChild(alert);
}

function renderGenderSelect(column) {
    let genderGroup = domService.createFormGroup();
    let genderLabel = domService.createLabel('gender-select', 'Gender:');

    let options = [
        { text: 'Select your gender...', value: '' },
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
    ];

    genderSelect = domService.createSelectList('gender-select', options);

    genderGroup.appendChild(genderLabel);
    genderGroup.appendChild(genderSelect);

    column.appendChild(genderGroup);
}

function renderWeightInput(column) {
    let weightGroup = domService.createFormGroup();
    let weightLabel = domService.createLabel('weight-input', 'Weight:');

    let weightInputGroup = domService.createInputGroup();
    weightInput = domService.createNumberInput('weight-input', 1, 999, 'Enter weight');
    let weightInputAddOn = domService.createInputGroupAddOn('lbs');

    weightInputGroup.appendChild(weightInput);
    weightInputGroup.appendChild(weightInputAddOn);

    weightGroup.appendChild(weightLabel);
    weightGroup.appendChild(weightInputGroup);

    column.appendChild(weightGroup);
}

function renderGoalSelect(column) {
    let goalGroup = domService.createFormGroup();
    let goalLabel = domService.createLabel('goal-select', 'Goal:');

    let options = [
        { text: 'Select gain or lose weight...', value: '' },
        { text: 'Lose Weight', value: 'lose' },
        { text: 'Gain Weight', value: 'gain' },
    ];

    goalSelect = domService.createSelectList('goal-select', options);

    goalGroup.appendChild(goalLabel);
    goalGroup.appendChild(goalSelect);

    column.appendChild(goalGroup);
}

function renderContinueButton(column) {
    let buttonGroup = domService.createFormGroup();
    continueButton = domService.createButtonInput('stats-button', 'CONTINUE');

    buttonGroup.appendChild(continueButton);

    column.appendChild(buttonGroup);
}

function getValues() {
    let genderValue = genderSelect.value;
    let weightValue = parseInt(weightInput.value, 10);
    let goalValue = goalSelect.value;

    let hasErrors = false;

    if(!isGenderValid(genderValue)) {
        hasErrors = true;
    }

    if(!isWeightValid(weightValue)) {
        hasErrors = true;
    }

    if(!isGoalValid(goalValue)) {
        hasErrors = true;
    }

    if(hasErrors) {
        alert.show();
    }
    else {
        alert.hide();
    }

    return {
        stats: {
            gender: genderValue,
            weight: weightValue,
            goal: goalValue
        },
        hasErrors: hasErrors
    };
}

function isGenderValid(genderValue) {
    if(genderValue.length === 0) {
        setErrorState(genderSelect);
        return false;
    }
    else {
        clearErrorState(genderSelect);
        return true;
    }
}

function isWeightValid(weightValue) {
    if(weightValue !== weightValue || (weightValue < 1 || weightValue > 999)) {
        setErrorState(weightInput);
        weightInput.value = '';
        weightInput.setAttribute('placeholder', 'Please enter a weight 1 through 999');

        return false;
    }
    else {
        clearErrorState(weightInput);
        return true;
    }
}

function isGoalValid(goalValue) {
    if(goalValue.length === 0) {
        setErrorState(goalSelect);
        return false;
    }
    else {
        clearErrorState(goalSelect);
        return true;
    }
}

function setErrorState(formControl) {
    let parent = formControl.parentNode;

    for(let i = 0; i < 2; i++) {
        if(parent.className === 'form-group') {
            parent.className = 'form-group has-error';
            break;
        }
        parent = parent.parentNode;
    }
}

function clearErrorState(formControl) {
    let parent = formControl.parentNode;

    for(let i = 0; i < 2; i++) {
        if(parent.className === 'form-group has-error') {
            parent.className = 'form-group';
            break;
        }
        parent = parent.parentNode;
    }
}

let statsService = new StatsService();

export default statsService;