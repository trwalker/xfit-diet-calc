import calculatorService from '../services/CalculatorService';
import domService from '../services/DomService';
import stateService from '../services/StateService';

let container = null;

class PlanComponent {

    render(appContainer) {
        container = domService.createRow();

        renderPlanTable(container);
        renderPrintLink(container);

        appContainer.appendChild(container);
    }

    show() {
        container.style.display = '';
        domService.scrollToTop();
    }

    hide() {
        container.style.display = 'none';
    }
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

function renderPrintLink(container) {
    const downloadColumn = domService.createColumn(12, 12);

    const downloadLink = domService.createPrintLink();
    downloadColumn.appendChild(downloadLink);

    container.appendChild(downloadColumn);
}

const instance = new PlanComponent();

export default instance;