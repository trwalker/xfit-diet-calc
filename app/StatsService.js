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
        let column = domService.createColumn();

        renderAlert(column);
        renderGenderSelect(column);
        renderWeightInput(column);
        renderGoalSelect(column);
        renderContinueButton(column);

        container.appendChild(column);
        appContainer.appendChild(container);
	}

	getValues() {
        let genderValue = genderSelect.value;
        let weightValue = weightInput.value;
        let goalValue = goalSelect.value;

        let errors = 0;

        if(genderValue.length === 0) {
            setErrorState(genderSelect);
            errors++;
        }
        else {
            clearErrorState(genderSelect);
        }

        let weight = parseInt(weightValue, 10);
        if(weight !== weight || (weight < 1 || weight > 999)) {
            setErrorState(weightInput);
            weightInput.value = '';
            weightInput.setAttribute('placeholder', 'Please enter a weight 1 through 999');
            errors++;
        }
        else {
            clearErrorState(weightInput);
        }

        if(goalValue.length === 0) {
            setErrorState(goalSelect);
            errors++;
        }
        else {
            clearErrorState(goalSelect);
        }

        if(errors > 0) {
            alert.style.display = '';
        }
        else {
            alert.style.display = 'none';
        }

        return {
            stats: {
                gender: genderValue,
                weight: weight,
                goal: goalValue
            },
            hasErrors: errors > 0
        };
    }

	hide() {
        container.style.display = 'none';
    }

    show() {
        container.style.display = '';
    }

    buttonClick(callback) {
        continueButton.onclick = () => {
            callback();
        }
    }
}

function renderAlert(column) {
    alert = domService.createAlert('Please correct highlighted fields');
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