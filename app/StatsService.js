let container = null;
let genderSelect = null;
let weightInput = null;
let goalSelect = null;

class StatsService {

    constructor() {
    }

	render(appContainer) {
        let row = document.createElement('div');
        row.className = 'row';

        container = row;

        let column = document.createElement('div');
        column.className = 'col-xs-12';

        renderGenderSelect(column);
        renderWeightInput(column);
        renderGoalSelect(column);

        row.appendChild(column);
        appContainer.appendChild(row);
	}

	getValues() {
        let genderValue = genderSelect.value;
        let weightValue = weightInput.value;
        let goalValue = goalSelect.value;

        let errors = [];

        if(genderValue.length === 0) {
            errors.push('Please select your gender');
        }

        let weight = parseInt(weightValue, 10);
        if(weight !== weight) {
            errors.push('Please enter a weight 1 through 999');
        }

        if(goalValue.length === 0) {
            errors.push('Please select your goal');
        }

        return {
            stats: {
                gender: genderValue,
                weight: weight,
                goal: goalValue
            },
            errors: errors.length == 0 ? null : errors
        };
    }

	hide() {
        container.style.display = 'none';
    }

    show() {

    }
}

function renderGenderSelect(column) {
    let genderGroup = document.createElement('div');
    genderGroup.className = 'form-group';

    let genderSelect = document.createElement('select');
    genderSelect.id = 'gender-select';
    genderSelect.className = 'form-control';

    genderSelect = genderSelect;

    let options = [
        { text: 'Select one...', value: '' },
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

    genderGroup.appendChild(genderSelect);
    column.appendChild(genderGroup);
}

function renderWeightInput(column) {
    let weightGroup = document.createElement('div');
    weightGroup.className = 'form-group';

    let weightInput = document.createElement('input');
    weightInput.id = 'weight-input';
    weightInput.type = 'number';
    weightInput.className = 'form-control';
    weightInput.min = 1;
    weightInput.max = 999;
    weightInput.maxLength = 3;
    weightInput.setAttribute('placeholder', 'Enter weight');

    weightInput = weightInput;

    weightGroup.appendChild(weightInput);
    column.appendChild(weightGroup);
}

function renderGoalSelect(column) {
    let goalGroup = document.createElement('div');
    goalGroup.className = 'form-group';

    let goalSelect = document.createElement('select');
    goalSelect.id = 'goal-select';
    goalSelect.className = 'form-control';

    goalSelect = goalSelect;

    let options = [
        { text: 'Select one...', value: '' },
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

    goalGroup.appendChild(goalSelect);
    column.appendChild(goalGroup);
}

let statsService = new StatsService();

export default statsService;