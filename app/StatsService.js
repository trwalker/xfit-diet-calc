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
    alert = document.createElement('div');
    alert.className = 'alert alert-danger';
    alert.innerText = 'Please correct highlighted fields';
    alert.style.display = 'none';

    column.appendChild(alert);
}

function renderGenderSelect(column) {
    let genderGroup = document.createElement('div');
    genderGroup.className = 'form-group';

    let genderLabel = document.createElement('label');
    genderLabel.setAttribute('for', 'gender-select');
    genderLabel.innerText = 'Gender:';

    genderSelect = document.createElement('select');
    genderSelect.id = 'gender-select';
    genderSelect.className = 'form-control';

    let options = [
        { text: 'Select Your Gender...', value: '' },
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
    ];

    options.forEach((currentOption) => {
        let option = document.createElement('option');
        option.text = currentOption.text;
        option.value = currentOption.value;

        genderSelect.appendChild(option);
    });

    genderSelect.selectedIndex = 0;

    genderGroup.appendChild(genderLabel);
    genderGroup.appendChild(genderSelect);
    column.appendChild(genderGroup);
}

function renderWeightInput(column) {
    let weightGroup = document.createElement('div');
    weightGroup.className = 'form-group';

    let weightLable = document.createElement('label');
    weightLable.setAttribute('for', 'weight-input');
    weightLable.innerText = 'Weight:';

    weightInput = document.createElement('input');
    weightInput.id = 'weight-input';
    weightInput.type = 'number';
    weightInput.className = 'form-control';
    weightInput.min = 1;
    weightInput.max = 999;
    weightInput.maxLength = 3;
    weightInput.setAttribute('placeholder', 'Enter weight');

    weightGroup.appendChild(weightLable);
    weightGroup.appendChild(weightInput);
    column.appendChild(weightGroup);
}

function renderGoalSelect(column) {
    let goalGroup = document.createElement('div');
    goalGroup.className = 'form-group';

    let goalLabel = document.createElement('label');
    goalLabel.setAttribute('for', 'goal-select');
    goalLabel.innerText = 'Goal:';

    goalSelect = document.createElement('select');
    goalSelect.id = 'goal-select';
    goalSelect.className = 'form-control';

    let options = [
        { text: 'Select Gain OR Lose Weight...', value: '' },
        { text: 'Lose Weight', value: 'lose' },
        { text: 'Gain Weight', value: 'gain' },
    ];

    options.forEach((currentOption) => {
        let option = document.createElement('option');
        option.text = currentOption.text;
        option.value = currentOption.value;

        goalSelect.appendChild(option);
    });

    goalSelect.selectedIndex = 0;

    goalGroup.appendChild(goalLabel);
    goalGroup.appendChild(goalSelect);
    column.appendChild(goalGroup);
}

function renderContinueButton(column) {
    let buttonGroup = document.createElement('div');
    buttonGroup.className = 'form-group';

    let button = document.createElement('input');
    button.id = 'stats-button';
    button.type = 'button';
    button.className = 'btn btn-default col-xs-12 col-md-4';
    button.value = 'CONTINUE';

    continueButton = button;

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