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

function renderPrintLink(container) {
    let downloadColumn = domService.createColumn(12, 12);

    let downloadLink = domService.createPrintLink();
    downloadColumn.appendChild(downloadLink);

    container.appendChild(downloadColumn);
}

let instance = new PlanComponent();

export default instance;