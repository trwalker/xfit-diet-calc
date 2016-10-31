import domService from './DomService';
import stateService from './StateService';

let container = null;
let alert = null;
let proteinInputs = [];
let fatInputs = [];
let carbsInputs = [];
let continueButton = null;
let continueCallback = null;

class NutritionComponent {

    render(appContainer) {
        container = domService.createRow();
        let column = domService.createColumn(12, 6);

        let nutrition = stateService.getNutrition();

        renderAlert(column);
        renderInputs(column, nutrition);
        renderContinueButton(column);

        container.appendChild(column);
        appContainer.appendChild(container);
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

function renderInputs(column, nutrition) {
    renderNutritionGroup(column, nutrition.dayOne, 'one');
    renderNutritionGroup(column, nutrition.dayTwo, 'two');
    renderNutritionGroup(column, nutrition.dayThree, 'three');
}

function renderNutritionGroup(column, data, suffix) {
    let proteinGroup = domService.createFormGroup();

    let label = domService.createLabel(`protein-input-${suffix}`, `Day ${suffix}:`);

    let proteinInputGroup = domService.createInputGroup();
    let proteinInputPrefix = domService.createInputGroupAddOn('protein');
    let proteinInput = domService.createNumberInput(`protein-input-${suffix}`, 1, 999, 'Enter protein');
    let proteinInputSuffix = domService.createInputGroupAddOn('grams');

    if(data.protein) {
        proteinInput.value = data.protein;
    }

    proteinInputGroup.appendChild(proteinInputPrefix);
    proteinInputGroup.appendChild(proteinInput);
    proteinInputGroup.appendChild(proteinInputSuffix);

    let carbsGroup = domService.createFormGroup();

    let carbsInputGroup = domService.createInputGroup();
    let carbsInputPrefix = domService.createInputGroupAddOn('carbs');
    let carbsInput = domService.createNumberInput(`carbs-input-${suffix}`, 1, 9999, 'Enter carbs');
    let carbsInputGroupSuffix = domService.createInputGroupAddOn('grams');

    if(data.carbs) {
        carbsInput.value = data.carbs;
    }

    carbsInputGroup.appendChild(carbsInputPrefix);
    carbsInputGroup.appendChild(carbsInput);
    carbsInputGroup.appendChild(carbsInputGroupSuffix);

    let fatGroup = domService.createFormGroup();

    let fatInputGroup = domService.createInputGroup();
    let fatInputGroupPrefix = domService.createInputGroupAddOn('fat');
    let fatInput = domService.createNumberInput(`fat-input-${suffix}`, 1, 999, 'Enter fat');
    let fatInputGroupSuffix = domService.createInputGroupAddOn('grams');

    if(data.fat) {
        fatInput.value = data.fat;
    }

    fatInputGroup.appendChild(fatInputGroupPrefix);
    fatInputGroup.appendChild(fatInput);
    fatInputGroup.appendChild(fatInputGroupSuffix);

    proteinInputs.push(proteinInput);
    carbsInputs.push(carbsInput);
    fatInputs.push(fatInput);

    proteinGroup.appendChild(label);
    proteinGroup.appendChild(proteinInputGroup);
    carbsGroup.appendChild(carbsInputGroup);
    fatGroup.appendChild(fatInputGroup);

    column.appendChild(proteinGroup);
    column.appendChild(carbsGroup);
    column.appendChild(fatGroup);
}

function renderContinueButton(column) {
    let buttonGroup = domService.createFormGroup();
    continueButton = domService.createButtonInput('stats-button', 'CONTINUE');

    continueButton.onclick = () => {
        let hasErrors = saveValues();
        if(!hasErrors && continueCallback) {
            continueCallback();
        }
    };

    buttonGroup.appendChild(continueButton);
    column.appendChild(buttonGroup);
}

function saveValues() {
    let proteinValues = getInputGroupValues(proteinInputs, 1, 999);
    let fatValues = getInputGroupValues(fatInputs, 1, 999);
    let carbsValues = getInputGroupValues(carbsInputs, 1, 9999);

    let hasErrors = proteinValues.hasErrors || fatValues.hasErrors || carbsValues.hasErrors;

    if(hasErrors) {
        alert.show();
    }
    else {
        alert.hide();
    }

    stateService.setNutrition({
        dayOne: {
            protein: proteinValues.values[0],
            fat: fatValues.values[0],
            carbs: carbsValues.values[0]
        },
        dayTwo: {
            protein: proteinValues.values[1],
            fat: fatValues.values[1],
            carbs: carbsValues.values[1]
        },
        dayThree: {
            protein: proteinValues.values[2],
            fat: fatValues.values[2],
            carbs: carbsValues.values[2]
        }
    });

    return hasErrors;
}

function getInputGroupValues(inputs, min, max) {
    let values = [
        parseInt(inputs[0].value),
        parseInt(inputs[1].value),
        parseInt(inputs[2].value)
    ];

    let hasErrors = false;

    values.forEach((currentValue, index) => {
        let input = inputs[index];

        if (currentValue !== currentValue || (currentValue < min || currentValue > max)) {
            setErrorState(input);
            input.value = '';
            input.setAttribute('placeholder', `Enter a value ${min} through ${max}`);

            hasErrors = true;
        }
        else {
            clearErrorState(input);
        }
    });

    return {
        values: values,
        hasErrors: hasErrors
    };
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

let instance = new NutritionComponent();

export default instance;