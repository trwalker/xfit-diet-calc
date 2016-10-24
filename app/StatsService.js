class StatsService {

	render(appContainer) {
        let row = document.createElement('div');
        row.className = 'row';

        let column = document.createElement('div');
        column.className = 'col-xs-12';

        renderWeightInput(column);
        renderGenderSelect(column);

        row.appendChild(column);
        appContainer.appendChild(row);
	}

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

    weightGroup.appendChild(weightInput);
    column.appendChild(weightGroup);
}

function renderGenderSelect(column) {
    let genderGroup = document.createElement('div');
    genderGroup.className = 'form-group';

    let genderSelect = document.createElement('select');
    genderSelect.id = 'weight-input';
    genderSelect.className = 'form-control';

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select one...';
    defaultOption.value = '';

    let maleOption = document.createElement('option');
    maleOption.text = 'Male';
    maleOption.value = 'male';

    let femaleOption = document.createElement('option');
    femaleOption.text = 'Female';
    femaleOption.value = 'female';

    genderSelect.appendChild(defaultOption);
    genderSelect.appendChild(maleOption);
    genderSelect.appendChild(femaleOption);

    genderSelect.selectedIndex = 0;

    genderGroup.appendChild(genderSelect);
    column.appendChild(genderGroup);
}



let statsService = new StatsService();

export default statsService;