import calculatorService from '../services/CalculatorService';
import domService from '../services/DomService';
import stateService from '../services/StateService';

class PrintPlanComponent {
    render(printContainer) {
        const row = domService.createRow();

        renderIcon(row);
        renderPlanTable(row);

        printContainer.appendChild(row);

        window.print();
    }
}

function renderIcon(container) {
    const iconColumn = domService.createColumn(12, 12);
    const icon = domService.createIcon();

    iconColumn.appendChild(icon);
    container.appendChild(iconColumn);
}

function renderPlanTable(container) {
    const tableColumn = domService.createColumn(12, 12);

    const panel = domService.createPanel('Your Plan');

    const stats = stateService.getStats();
    const nutrition = stateService.getNutrition();

    const plan = calculatorService.calculatePlan(stats, nutrition);

    const table = domService.createPlanTable(plan);
    panel.body.appendChild(table);

    tableColumn.appendChild(panel);

    container.appendChild(tableColumn);
}

const instance = new PrintPlanComponent();

export default instance;