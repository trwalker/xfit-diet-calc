import domService from './DomService';

let container = null;
let alert = null;
let protein = [];
let fat = [];
let carbs = [];
let continueButton = null;

class NutritionService {

    render(appContainer) {
        container = domService.createRow();
        let column = domService.createColumn();

        renderAlert(column);
        renderInputs(column);
        renderContinueButton(column);

        container.appendChild(column);
        appContainer.appendChild(container);

        this.hide();
    }

    hide() {
        container.style.display = 'none';
    }

    show() {
        container.style.display = '';
    }

}

function renderAlert(column) {
    alert = domService.createAlert('Please correct highlighted fields');
    column.appendChild(alert);
}

function renderInputs(column) {
    renderNutritionGroup(column, 'one');
    renderNutritionGroup(column, 'two');
    renderNutritionGroup(column, 'three');
}

function renderNutritionGroup(column, suffix) {
    let proteinGroup = domService.createFormGroup();

    let label = domService.createLabel(`protein-input-${suffix}`, `Day ${suffix}:`);

    let proteinInputGroup = domService.createInputGroup();
    let proteinInput = domService.createNumberInput(`protein-input-${suffix}`, 1, 999, 'Enter protein');
    let proteinInputGroupAddOn = domService.createInputGroupAddOn('grams');
    proteinInputGroup.appendChild(proteinInput);
    proteinInputGroup.appendChild(proteinInputGroupAddOn);

    let carbsGroup = domService.createFormGroup();

    let carbsInputGroup = domService.createInputGroup();
    let carbsInput = domService.createNumberInput(`carbs-input-${suffix}`, 1, 9999, 'Enter carbs');
    let carbsInputGroupAddOn = domService.createInputGroupAddOn('grams');
    carbsInputGroup.appendChild(carbsInput);
    carbsInputGroup.appendChild(carbsInputGroupAddOn);

    let fatGroup = domService.createFormGroup();

    let fatInputGroup = domService.createInputGroup();
    let fatInput = domService.createNumberInput(`fat-input-${suffix}`, 1, 999, 'Enter fat');
    let fatInputGroupAddOn = domService.createInputGroupAddOn('grams');
    fatInputGroup.appendChild(fatInput);
    fatInputGroup.appendChild(fatInputGroupAddOn);

    protein.push(proteinInput);
    carbs.push(carbsInput);
    fat.push(fatInput);

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

    buttonGroup.appendChild(continueButton);
    column.appendChild(buttonGroup);
}

let nutritionService = new NutritionService();

export default nutritionService;