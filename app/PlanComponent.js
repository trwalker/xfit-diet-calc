import calculatorService from './CalculatorService';
import domService from './DomService';
import stateService from './StateService';

let container = null;

class PlanComponent {

    render(appContainer) {
        container = domService.createRow();
        let tableColumn = domService.createColumn(12, 6);

        let panel = domService.createPanel('Your Plan');

        let stats = stateService.getStats();
        let nutrition = stateService.getNutrition();

        let plan = calculatorService.calculatePlan(stats, nutrition);

        let table = domService.createPlanTable(plan);
        panel.body.appendChild(table);

        let downloadColumn = domService.createColumn(12, 12);

        let downloadLink = domService.createCsvDownloadLink(plan);
        downloadColumn.appendChild(downloadLink);

        tableColumn.appendChild(panel);

        container.appendChild(tableColumn);
        container.appendChild(downloadColumn);

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

let instance = new PlanComponent();

export default instance;