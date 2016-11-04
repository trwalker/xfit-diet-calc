import domService from '../services/DomService';
import stateService from '../services/StateService';
import * as inputValues from '../constants/InputValues';

let container = null;
let alert = null;
let genderSelect = null;
let weightInput = null;
let goalSelect = null;
let continueButton = null;
let continueCallback = null;

class AboutComponent {

	render(appContainer) {
        const statsState = stateService.getStats();

        container = domService.createRow();
        const column = domService.createColumn(12, 6);

        renderAlert(column);

        const panel = domService.createPanel('About Me');
        column.appendChild(panel);

        renderGenderSelect(panel.body, statsState);
        renderWeightInput(panel.body, statsState);
        renderGoalSelect(panel.body, statsState);

        renderContinueButton(column);

        container.appendChild(column);
        appContainer.appendChild(container);
	}

    show() {
        container.style.display = '';
        domService.scrollToTop();
    }

	hide() {
        container.style.display = 'none';
    }

    setContinueCallback(callback) {
        continueCallback = callback;
    }
}

function renderAlert(column) {
    alert = domService.createAlert('Please complete the highlighted fields');
    column.appendChild(alert);
}

function renderGenderSelect(parent, statsState) {
    const genderGroup = domService.createFormGroup();
    const genderLabel = domService.createLabel('gender-select', 'Gender:');

    const options = [
        { text: 'Select your gender...', value: '' },
        { text: 'Male', value: inputValues.MALE },
        { text: 'Female', value: inputValues.FEMALE },
    ];

    genderSelect = domService.createSelectList('gender-select', options);

    if(statsState.gender) {
        options.forEach((option, index) => {
           if(option.value === statsState.gender) {
               genderSelect.selectedIndex = index;
           }
        });
    }

    genderGroup.appendChild(genderLabel);
    genderGroup.appendChild(genderSelect);

    parent.appendChild(genderGroup);
}

function renderWeightInput(parent, statsState) {
    const weightGroup = domService.createFormGroup();
    const weightLabel = domService.createLabel('weight-input', 'Weight:');

    const weightInputGroup = domService.createInputGroup();
    weightInput = domService.createNumberInput('weight-input', 1, 999, 'Enter weight');
    const weightInputAddOn = domService.createInputGroupAddOn('lbs');

    if(statsState.weight) {
        weightInput.value = statsState.weight;
    }

    weightInputGroup.appendChild(weightInput);
    weightInputGroup.appendChild(weightInputAddOn);

    weightGroup.appendChild(weightLabel);
    weightGroup.appendChild(weightInputGroup);

    parent.appendChild(weightGroup);
}

function renderGoalSelect(parent, statsState) {
    const goalGroup = domService.createFormGroup();
    const goalLabel = domService.createLabel('goal-select', 'Goal:');

    const options = [
        { text: 'Select gain or lose weight...', value: '' },
        { text: 'Lose Weight', value: inputValues.LOSER },
        { text: 'Gain Weight', value: inputValues.GAINER },
    ];

    goalSelect = domService.createSelectList('goal-select', options);

    if(statsState.goal) {
        options.forEach((option, index) => {
            if(option.value === statsState.goal) {
                goalSelect.selectedIndex = index;
            }
        });
    }

    goalGroup.appendChild(goalLabel);
    goalGroup.appendChild(goalSelect);

    parent.appendChild(goalGroup);
}

function renderContinueButton(column) {
    const buttonGroup = domService.createFormGroup();
    continueButton = domService.createButtonInput('stats-button', 'CONTINUE');

    continueButton.onclick = () => {
        const hasErrors = saveValues();
        if(!hasErrors && continueCallback) {
            continueCallback();
        }
    };

    buttonGroup.appendChild(continueButton);

    column.appendChild(buttonGroup);
}

function saveValues() {
    const genderValue = genderSelect.value;
    const weightValue = parseInt(weightInput.value, 10);
    const goalValue = goalSelect.value;

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

    stateService.setStats({
        gender: genderValue,
        weight: weightValue,
        goal: goalValue
    });

    return hasErrors;
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

const instance = new AboutComponent();

export default instance;