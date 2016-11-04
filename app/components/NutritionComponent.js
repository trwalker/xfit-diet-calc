import domService from '../services/DomService';
import stateService from '../services/StateService';

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
        const column = domService.createColumn(12, 12);

        const nutrition = stateService.getNutrition();

        renderAlert(column);
        renderInputs(column, nutrition);
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

function renderInputs(column, nutrition) {
    renderNutritionGroup(column, nutrition.dayOne, 'One');
    renderNutritionGroup(column, nutrition.dayTwo, 'Two');
    renderNutritionGroup(column, nutrition.dayThree, 'Three');
}

function renderNutritionGroup(column, data, suffix) {
    const nutritionColumn = domService.createColumn(12, 6);

    const panel = domService.createPanel(`Day ${suffix}`);

    const proteinGroup = domService.createFormGroup();

    const proteinLabel = domService.createLabel(`protein-input-${suffix.toLowerCase()}`, `Protein:`);
    const proteinInputGroup = domService.createInputGroup();

    const proteinInput = domService.createNumberInput(`protein-input-${suffix.toLowerCase()}`, 1, 999, 'Enter protein');
    const proteinInputSuffix = domService.createInputGroupAddOn('grams');

    if(data.protein) {
        proteinInput.value = data.protein;
    }

    proteinInputGroup.appendChild(proteinInput);
    proteinInputGroup.appendChild(proteinInputSuffix);
    proteinGroup.appendChild(proteinLabel);
    proteinGroup.appendChild(proteinInputGroup);

    const carbsGroup = domService.createFormGroup();

    const carbsLabel = domService.createLabel(`carbs-input-${suffix.toLowerCase()}`, `Carbs:`);

    const carbsInputGroup = domService.createInputGroup();
    const carbsInput = domService.createNumberInput(`carbs-input-${suffix.toLowerCase()}`, 1, 9999, 'Enter carbs');
    const carbsInputGroupSuffix = domService.createInputGroupAddOn('grams');

    if(data.carbs) {
        carbsInput.value = data.carbs;
    }

    carbsInputGroup.appendChild(carbsInput);
    carbsInputGroup.appendChild(carbsInputGroupSuffix);
    carbsGroup.appendChild(carbsLabel);
    carbsGroup.appendChild(carbsInputGroup);

    const fatGroup = domService.createFormGroup();

    const fatLabel = domService.createLabel(`fat-input-${suffix.toLowerCase()}`, `Fat:`);

    const fatInputGroup = domService.createInputGroup();
    const fatInput = domService.createNumberInput(`fat-input-${suffix.toLowerCase()}`, 1, 999, 'Enter fat');
    const fatInputGroupSuffix = domService.createInputGroupAddOn('grams');

    if(data.fat) {
        fatInput.value = data.fat;
    }

    fatInputGroup.appendChild(fatInput);
    fatInputGroup.appendChild(fatInputGroupSuffix);
    fatGroup.appendChild(fatLabel);
    fatGroup.appendChild(fatInputGroup);

    proteinInputs.push(proteinInput);
    carbsInputs.push(carbsInput);
    fatInputs.push(fatInput);

    panel.body.appendChild(proteinGroup);
    panel.body.appendChild(carbsGroup);
    panel.body.appendChild(fatGroup);

    nutritionColumn.appendChild(panel);
    column.appendChild(nutritionColumn);
}

function renderContinueButton(column) {
    const buttonColumn = domService.createColumn(12, 12);

    const buttonGroup = domService.createFormGroup();
    continueButton = domService.createButtonInput('stats-button', 'CONTINUE');

    continueButton.onclick = () => {
        const hasErrors = saveValues();
        if(!hasErrors && continueCallback) {
            continueCallback();
        }
    };

    buttonGroup.appendChild(continueButton);

    buttonColumn.appendChild(buttonGroup);
    column.appendChild(buttonColumn);
}

function saveValues() {
    const proteinValues = getInputGroupValues(proteinInputs, 1, 999);
    const fatValues = getInputGroupValues(fatInputs, 1, 999);
    const carbsValues = getInputGroupValues(carbsInputs, 1, 9999);

    const hasErrors = proteinValues.hasErrors || fatValues.hasErrors || carbsValues.hasErrors;

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
    const values = [
        parseInt(inputs[0].value),
        parseInt(inputs[1].value),
        parseInt(inputs[2].value)
    ];

    let hasErrors = false;

    values.forEach((currentValue, index) => {
        const input = inputs[index];

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

const instance = new NutritionComponent();

export default instance;