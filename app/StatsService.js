import domService from './DomService';

let container = null;
let alert = null;
let genderSelect = null;
let weightInput = null;
let goalSelect = null;
let continueButton = null;

class StatsService {

	render(appContainer) {
        let row = document.createElement('div');
        row.className = 'row';

        container = row;

        let column = document.createElement('div');
        column.className = 'col-xs-12 col-md-6';

        renderAlert(column);
        renderGenderSelect(column);
        renderWeightInput(column);
        renderGoalSelect(column);
        renderContinueButton(column);

        row.appendChild(column);
        appContainer.appendChild(row);
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
        { text: 'Select Your Gender...', value: '' },
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
    weightInput = domService.createNumberInput('weight-input', 1, 999, 'Enter weight');

    weightGroup.appendChild(weightLabel);
    weightGroup.appendChild(weightInput);
    column.appendChild(weightGroup);
}

function renderGoalSelect(column) {
    let goalGroup = domService.createFormGroup();
    let goalLabel = domService.createLabel('goal-select', 'Goal:');

    let options = [
        { text: 'Select Gain OR Lose Weight...', value: '' },
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
    let formGroup = formControl.parentNode;
    formGroup.className = 'form-group has-error';
}

function clearErrorState(formControl) {
    let formGroup = formControl.parentNode;
    formGroup.className = 'form-group';
}

let statsService = new StatsService();

export default statsService;