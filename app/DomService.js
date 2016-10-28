
class DomService {
    createRow() {
        let row = document.createElement('div');
        row.className = 'row';

        return row;
    }

    createColumn() {
        let column = document.createElement('div');
        column.className = 'col-xs-12 col-md-6';

        return column;
    }

    createAlert(text) {
        let alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.innerText = text;
        alert.style.display = 'none';

        alert.show = function() {
            this.style.display = '';
        };

        alert.hide = function() {
            this.style.display = 'none';
        };

        return alert;
    }

    createFormGroup() {
        let group = document.createElement('div');
        group.className = 'form-group';

        return group;
    }

    createInputGroup() {
        let group = document.createElement('div');
        group.className = 'input-group';

        return group;
    }

    createInputGroupAddOn(text) {
        let addOn = document.createElement('span');
        addOn.className = 'input-group-addon';
        addOn.innerText = text;

        return addOn;
    }

    createLabel(id, text) {
        let label = document.createElement('label');
        label.setAttribute('for', id);
        label.innerText = text;

        return label;
    }

    createSelectList(id, options) {
        let select = document.createElement('select');
        select.id = id;
        select.className = 'form-control';

        options.forEach((currentOption) => {
            let option = document.createElement('option');
            option.text = currentOption.text;
            option.value = currentOption.value;

            select.appendChild(option);
        });

        select.selectedIndex = 0;

        return select;
    }

    createNumberInput(id, min, max, placeholder) {
        let numberInput = document.createElement('input');
        numberInput.id = id;
        numberInput.type = 'number';
        numberInput.className = 'form-control';
        numberInput.min = min;
        numberInput.max = max;
        numberInput.setAttribute('placeholder', placeholder);

        return numberInput;
    }

    createButtonInput(id, text) {
        let button = document.createElement('input');
        button.id = id;
        button.type = 'button';
        button.className = 'btn btn-default col-xs-12 col-md-4';
        button.value = text;

        return button;
    }

    createNutritionTable(nutrition) {
        let table = document.createElement('table');
        table.className = 'table table-striped';

        let tableHeader = document.createElement('thead');

        let headerRow = document.createElement('tr');

        let weekHeader = document.createElement('th');
        weekHeader.innerText = 'Weeks';

        let proteinHeader = document.createElement('th');
        proteinHeader.innerText = 'Protein';

        let fatHeader = document.createElement('th');
        fatHeader.innerText = 'Fat';

        let carbsHeader = document.createElement('th');
        carbsHeader.innerText = 'Carbs';

        headerRow.appendChild(weekHeader);
        headerRow.appendChild(proteinHeader);
        headerRow.appendChild(fatHeader);
        headerRow.appendChild(carbsHeader);

        tableHeader.appendChild(headerRow);
        table.appendChild(tableHeader);

        let tableBody = document.createElement('tbody');

        nutrition.forEach((nutritionData, index) => {
            let tableRow = document.createElement('tr');

            let weekCell = document.createElement('th');

            switch (index) {
                case 0:
                    weekCell.innerText = '1/2';
                    break;
                case 1:
                    weekCell.innerText = '3/4';
                    break;
                case 2:
                    weekCell.innerText = '5/6';
                    break;
            }

            let proteinCell = document.createElement('td');
            proteinCell.innerText = nutritionData.protein;

            let fatCell = document.createElement('td');
            fatCell.innerText = nutritionData.fat;

            let carbsCell = document.createElement('td');
            carbsCell.innerText = nutritionData.carbs;

            tableRow.appendChild(weekCell);
            tableRow.appendChild(proteinCell);
            tableRow.appendChild(fatCell);
            tableRow.appendChild(carbsCell);

            tableBody.appendChild(tableRow);
        });

        table.appendChild(tableBody);

        return table;
    }

    createCsvDownloadLink(nutrition) {
        var csvContent = "data:text/csv;charset=utf-8,";

        let csvHeader = 'weeks,protein,fat,carbs\n';
        csvContent += csvHeader;

        nutrition.forEach(function(nutritionData, index){
            let week;

            switch (index) {
                case 0:
                    week = '1 & 2';
                    break;
                case 1:
                    week = '3 & 4';
                    break;
                case 2:
                    week = '5 & 6';
                    break;
            }

            let csvRow = `${week},${nutritionData.protein},${nutritionData.fat},${nutritionData.carbs}`;
            csvContent += index < nutrition.length ? csvRow + '\n' : csvRow;
        });

        let encodedUri = encodeURI(csvContent);
        let link = document.createElement('a');
        link.innerText = 'Download';
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'nutrition.csv');

        return link;
    }
}

let domService = new DomService();

export default domService;