let appAnchor = null;

class DomService {
    getAppContainer() {
        let container = null;

        if(window.location.pathname.indexOf('/nutrition-calculator') !== -1) {
            container = document.getElementById('main');

            if (container) {
                appAnchor = document.createElement('span');
                container.appendChild(appAnchor);
            }
        }

        return container;
    }

    getPrintContainer() {
        let printContainer = null;

        if(window.location.pathname.indexOf('/print-plan.html') !== -1) {
            printContainer = document.getElementById('print-container');
        }

        return printContainer;
    }

    scrollToTop() {
        scrollToAnchor();
    }

    createRow() {
        const row = document.createElement('div');
        row.className = 'row';

        return row;
    }

    createColumn(xsWidth, mdWidth) {
        const column = document.createElement('div');
        column.className = `col-xs-${xsWidth} col-md-${mdWidth}`;

        return column;
    }

    createAlert(text) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.innerHTML = text;
        alert.style.display = 'none';

        alert.show = function() {
            this.style.display = '';
            scrollToAnchor();
        };

        alert.hide = function() {
            this.style.display = 'none';
        };

        return alert;
    }

    createPanel(headerText) {
        const panel = document.createElement('div');
        panel.className = 'panel panel-default';

        const panelHeader = document.createElement('div');
        panelHeader.className = 'panel-heading';

        const panelHeaderText = document.createElement('h5');
        panelHeaderText.innerHTML =  headerText;

        panelHeader.appendChild(panelHeaderText);

        const panelBody = document.createElement('div');
        panelBody.className = 'panel-body';

        panel.appendChild(panelHeader);
        panel.appendChild(panelBody);

        panel.body = panelBody;

        return panel;
    }

    createFormGroup() {
        const group = document.createElement('div');
        group.className = 'form-group';

        return group;
    }

    createInputGroup() {
        const group = document.createElement('div');
        group.className = 'input-group';

        return group;
    }

    createInputGroupAddOn(text) {
        const addOn = document.createElement('span');
        addOn.className = 'input-group-addon';
        addOn.innerHTML = text;

        return addOn;
    }

    createLabel(id, text) {
        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.innerHTML = text;

        return label;
    }

    createSelectList(id, options) {
        const select = document.createElement('select');
        select.id = id;
        select.className = 'form-control';

        options.forEach((currentOption) => {
            const option = document.createElement('option');
            option.text = currentOption.text;
            option.value = currentOption.value;

            select.appendChild(option);
        });

        select.selectedIndex = 0;

        return select;
    }

    createNumberInput(id, min, max, placeholder) {
        const numberInput = document.createElement('input');
        numberInput.id = id;
        numberInput.type = 'number';
        numberInput.className = 'form-control';
        numberInput.min = min;
        numberInput.max = max;
        numberInput.setAttribute('placeholder', placeholder);

        return numberInput;
    }

    createButtonInput(id, text) {
        const button = document.createElement('input');
        button.id = id;
        button.type = 'button';
        button.className = 'btn btn-default col-xs-12 col-md-4';
        button.value = text;

        return button;
    }

    createPlanTable(plan) {
        const table = document.createElement('table');
        table.className = 'table table-striped';

        const tableHeader = document.createElement('thead');

        const headerRow = document.createElement('tr');

        const weekHeader = document.createElement('th');
        weekHeader.innerHTML = 'Weeks';

        const proteinHeader = document.createElement('th');
        proteinHeader.innerHTML = 'Protein';

        const fatHeader = document.createElement('th');
        fatHeader.innerHTML = 'Fat&nbsp;&nbsp;&nbsp;';

        const carbsHeader = document.createElement('th');
        carbsHeader.innerHTML = 'Carbs';

        headerRow.appendChild(weekHeader);
        headerRow.appendChild(proteinHeader);
        headerRow.appendChild(fatHeader);
        headerRow.appendChild(carbsHeader);

        tableHeader.appendChild(headerRow);
        table.appendChild(tableHeader);

        const tableBody = document.createElement('tbody');

        plan.forEach((planItem, index) => {
            const tableRow = document.createElement('tr');

            const weekCell = document.createElement('th');

            switch (index) {
                case 0:
                    weekCell.innerHTML = '1/2';
                    break;
                case 1:
                    weekCell.innerHTML = '3/4';
                    break;
                case 2:
                    weekCell.innerHTML = '5/6';
                    break;
            }

            const proteinCell = document.createElement('td');
            proteinCell.innerHTML = planItem.protein;

            const fatCell = document.createElement('td');
            fatCell.innerHTML = planItem.fat;

            const carbsCell = document.createElement('td');
            carbsCell.innerHTML = planItem.carbs;

            tableRow.appendChild(weekCell);
            tableRow.appendChild(proteinCell);
            tableRow.appendChild(fatCell);
            tableRow.appendChild(carbsCell);

            tableBody.appendChild(tableRow);
        });

        table.appendChild(tableBody);

        return table;
    }

    createPrintLink() {
        const link = document.createElement('a');
        link.setAttribute('href', 'http://yournutritionchallenge.com/print-plan.html');
        link.setAttribute('target', '_blank');

        const linkText = document.createElement('span');
        linkText.innerHTML = "Print Plan";

        const dataUri = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDg1LjIxMyA0ODUuMjEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0ODUuMjEzIDQ4NS4yMTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTIxLjMwNSwzMC4zMjdoMjQyLjYwNHY2MC42NTFoMzAuMzI3VjMwLjMyN0MzOTQuMjM2LDEzLjU5NSwzODAuNjc0LDAsMzYzLjkwOSwwSDEyMS4zMDUgICAgYy0xNi43MzEsMC0zMC4zMjcsMTMuNTk1LTMwLjMyNywzMC4zMjd2NjAuNjUxaDMwLjMyN1YzMC4zMjd6IiBmaWxsPSIjRDgwMDI3Ii8+CgkJPHBhdGggZD0iTTQ1NC44OSwxMjEuMzA0SDMwLjMyOGMtMTYuNzMxLDAtMzAuMzI3LDEzLjU5MS0zMC4zMjcsMzAuMzI0djE1MS42MjljMCwxNi43NjQsMTMuNTk1LDMwLjMyNywzMC4zMjcsMzAuMzI3aDYwLjY1MSAgICB2MTIxLjMwMmMwLDE2Ljc2NCwxMy41OTUsMzAuMzI2LDMwLjMyNywzMC4zMjZoMjQyLjYwNGMxNi43NjUsMCwzMC4zMjctMTMuNTYyLDMwLjMyNy0zMC4zMjZWMzMzLjU4NGg2MC42NTMgICAgYzE2Ljc1OSwwLDMwLjMyMi0xMy41NjMsMzAuMzIyLTMwLjMyN1YxNTEuNjI4QzQ4NS4yMTIsMTM0Ljg5NSw0NzEuNjQ4LDEyMS4zMDQsNDU0Ljg5LDEyMS4zMDR6IE0zNjMuOTA5LDQ1NC44ODZIMTIxLjMwNSAgICB2LTIxMi4yOGgyNDIuNjA0VjQ1NC44ODZ6IE00MjQuNTYyLDIxMi4yODJjLTE2Ljc2NCwwLTMwLjMyNi0xMy41NjQtMzAuMzI2LTMwLjMyN2MwLTE2LjczMSwxMy41NjItMzAuMzI3LDMwLjMyNi0zMC4zMjcgICAgYzE2Ljc2NSwwLDMwLjMyNywxMy41OTUsMzAuMzI3LDMwLjMyN0M0NTQuODksMTk4LjcxNyw0NDEuMzI3LDIxMi4yODIsNDI0LjU2MiwyMTIuMjgyeiIgZmlsbD0iI0Q4MDAyNyIvPgoJCTxyZWN0IHg9IjE1MS42MjkiIHk9IjI3Mi45MyIgd2lkdGg9IjEyMS4zMDQiIGhlaWdodD0iMzAuMzI3IiBmaWxsPSIjRDgwMDI3Ii8+CgkJPHJlY3QgeD0iMTUxLjYyOSIgeT0iMzMzLjU4NCIgd2lkdGg9IjE4MS45NTgiIGhlaWdodD0iMzAuMzIxIiBmaWxsPSIjRDgwMDI3Ii8+CgkJPHJlY3QgeD0iMTUxLjYyOSIgeT0iMzk0LjIzNyIgd2lkdGg9IjE4MS45NTgiIGhlaWdodD0iMzAuMzIyIiBmaWxsPSIjRDgwMDI3Ii8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==';

        const width = 48;
        const height = 24;

        const printSvg = document.createElement('img');
        printSvg.setAttribute('src', dataUri);
        printSvg.setAttribute('width', width);
        printSvg.setAttribute('height', height);
        printSvg.style.width = `${width}px`;
        printSvg.style.height = `${height}px`;

        link.appendChild(printSvg);
        link.appendChild(linkText);

        return link;
    }

    createIcon() {
        const icon = document.createElement('img');
        icon.setAttribute('src', 'http://yournutritionchallenge.com/wp-includes/images/cfns-logo2.png');
        icon.style.padding = '10px 0';

        return icon;
    }
}

function scrollToAnchor() {
    appAnchor.scrollIntoView(true);
    scrollBy(0, -100);
}

const instance = new DomService();

export default instance;