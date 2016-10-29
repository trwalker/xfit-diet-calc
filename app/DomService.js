
class DomService {
    createRow() {
        let row = document.createElement('div');
        row.className = 'row';

        return row;
    }

    createColumn(xsWidth, mdWidth) {
        let column = document.createElement('div');
        column.className = `col-xs-${xsWidth} col-md-${mdWidth}`;

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

    createPlanTable(plan) {
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

        plan.forEach((planItem, index) => {
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
            proteinCell.innerText = planItem.protein;

            let fatCell = document.createElement('td');
            fatCell.innerText = planItem.fat;

            let carbsCell = document.createElement('td');
            carbsCell.innerText = planItem.carbs;

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
        let csvContent = "data:text/csv;charset=utf-8,";

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
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'nutrition.csv');

        let linkText = document.createElement('span');
        linkText.innerText = "Download";

        const dataUri = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDc1LjA3OCA0NzUuMDc3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzUuMDc4IDQ3NS4wNzc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDY3LjA4MywzMTguNjI3Yy01LjMyNC01LjMyOC0xMS44LTcuOTk0LTE5LjQxLTcuOTk0SDMxNS4xOTVsLTM4LjgyOCwzOC44MjdjLTExLjA0LDEwLjY1Ny0yMy45ODIsMTUuOTg4LTM4LjgyOCwxNS45ODggICAgYy0xNC44NDMsMC0yNy43ODktNS4zMjQtMzguODI4LTE1Ljk4OGwtMzguNTQzLTM4LjgyN0gyNy40MDhjLTcuNjEyLDAtMTQuMDgzLDIuNjY5LTE5LjQxNCw3Ljk5NCAgICBDMi42NjQsMzIzLjk1NSwwLDMzMC40MjcsMCwzMzguMDQ0djkxLjM1OGMwLDcuNjE0LDIuNjY0LDE0LjA4NSw3Ljk5NCwxOS40MTRjNS4zMyw1LjMyOCwxMS44MDEsNy45OSwxOS40MTQsNy45OWg0MjAuMjY2ICAgIGM3LjYxLDAsMTQuMDg2LTIuNjYyLDE5LjQxLTcuOTljNS4zMzItNS4zMjksNy45OTQtMTEuOCw3Ljk5NC0xOS40MTR2LTkxLjM1OEM0NzUuMDc4LDMzMC40MjcsNDcyLjQxNiwzMjMuOTU1LDQ2Ny4wODMsMzE4LjYyN3ogICAgIE0zNjAuMDI1LDQxNC44NDFjLTMuNjIxLDMuNjE3LTcuOTA1LDUuNDI0LTEyLjg1NCw1LjQyNHMtOS4yMjctMS44MDctMTIuODQ3LTUuNDI0Yy0zLjYxNC0zLjYxNy01LjQyMS03Ljg5OC01LjQyMS0xMi44NDQgICAgYzAtNC45NDgsMS44MDctOS4yMzYsNS40MjEtMTIuODQ3YzMuNjItMy42Miw3Ljg5OC01LjQzMSwxMi44NDctNS40MzFzOS4yMzIsMS44MTEsMTIuODU0LDUuNDMxICAgIGMzLjYxMywzLjYxLDUuNDIxLDcuODk4LDUuNDIxLDEyLjg0N0MzNjUuNDQ2LDQwNi45NDIsMzYzLjYzOCw0MTEuMjI0LDM2MC4wMjUsNDE0Ljg0MXogTTQzMy4xMDksNDE0Ljg0MSAgICBjLTMuNjE0LDMuNjE3LTcuODk4LDUuNDI0LTEyLjg0OCw1LjQyNGMtNC45NDgsMC05LjIyOS0xLjgwNy0xMi44NDctNS40MjRjLTMuNjEzLTMuNjE3LTUuNDItNy44OTgtNS40Mi0xMi44NDQgICAgYzAtNC45NDgsMS44MDctOS4yMzYsNS40Mi0xMi44NDdjMy42MTctMy42Miw3Ljg5OC01LjQzMSwxMi44NDctNS40MzFjNC45NDksMCw5LjIzMywxLjgxMSwxMi44NDgsNS40MzEgICAgYzMuNjE3LDMuNjEsNS40MjcsNy44OTgsNS40MjcsMTIuODQ3QzQzOC41MzYsNDA2Ljk0Miw0MzYuNzI5LDQxMS4yMjQsNDMzLjEwOSw0MTQuODQxeiIgZmlsbD0iI0Q4MDAyNyIvPgoJCTxwYXRoIGQ9Ik0yMjQuNjkyLDMyMy40NzljMy40MjgsMy42MTMsNy43MSw1LjQyMSwxMi44NDcsNS40MjFjNS4xNDEsMCw5LjQxOC0xLjgwOCwxMi44NDctNS40MjFsMTI3LjkwNy0xMjcuOTA4ICAgIGM1Ljg5OS01LjUxOSw3LjIzNC0xMi4xODIsMy45OTctMTkuOTg2Yy0zLjIzLTcuNDIxLTguODQ3LTExLjEzMi0xNi44NDQtMTEuMTM2aC03My4wOTFWMzYuNTQzYzAtNC45NDgtMS44MTEtOS4yMzEtNS40MjEtMTIuODQ3ICAgIGMtMy42Mi0zLjYxNy03LjkwMS01LjQyNi0xMi44NDctNS40MjZoLTczLjA5NmMtNC45NDYsMC05LjIyOSwxLjgwOS0xMi44NDcsNS40MjZjLTMuNjE1LDMuNjE2LTUuNDI0LDcuODk4LTUuNDI0LDEyLjg0N1YxNjQuNDUgICAgaC03My4wODljLTcuOTk4LDAtMTMuNjEsMy43MTUtMTYuODQ2LDExLjEzNmMtMy4yMzQsNy44MDEtMS45MDMsMTQuNDY3LDMuOTk5LDE5Ljk4NkwyMjQuNjkyLDMyMy40Nzl6IiBmaWxsPSIjRDgwMDI3Ii8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==';
        const width = 48;
        const height = 32;
        let downloadSvg = document.createElement('img');
        downloadSvg.setAttribute('src', dataUri);
        downloadSvg.setAttribute('width', width);
        downloadSvg.setAttribute('height', height);
        downloadSvg.style.width = `${width}px`;
        downloadSvg.style.height = `${height}px`;

        link.appendChild(downloadSvg);
        link.appendChild(linkText);

        return link;
    }
}

let domService = new DomService();

export default domService;