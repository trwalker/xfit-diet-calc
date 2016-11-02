import calculatorService from '../services/CalculatorService';
import domService from '../services/DomService';
import stateService from '../services/StateService';

class PrintPlanComponent {
    render(printContainer) {
        let row = domService.createRow();

        renderIcon(row);
        renderPlanTable(row);

        printContainer.appendChild(row);

        window.print();
    }
}

function renderIcon(container) {
    let iconColumn = domService.createColumn(12, 12);
    let icon = domService.createIcon();

    iconColumn.appendChild(icon);
    container.appendChild(iconColumn);
}

function renderPlanTable(container) {
    let tableColumn = domService.createColumn(12, 12);

    let panel = domService.createPanel('Your Plan');

    let stats = stateService.getStats();
    let nutrition = stateService.getNutrition();

    let plan = calculatorService.calculatePlan(stats, nutrition);

    let table = domService.createPlanTable(plan);
    panel.body.appendChild(table);

    tableColumn.appendChild(panel);

    container.appendChild(tableColumn);
}

let instance = new PrintPlanComponent();

export default instance;