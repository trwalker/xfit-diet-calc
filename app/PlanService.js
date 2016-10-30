import calculatorService from './CalculatorService';
import domService from './DomService';
import stateService from './StateService';


let container = null;

class PlanService {

    render(appContainer) {
        container = domService.createRow();
        let tableColumn = domService.createColumn(12, 6);

        let stats = stateService.getStats();
        let nutrition = stateService.getNutrition();

        let plan = calculatorService.calculatePlan(stats, nutrition);

        let table = domService.createPlanTable(plan);
        tableColumn.appendChild(table);

        let downloadColumn = domService.createColumn(12, 12);

        let downloadLink = domService.createCsvDownloadLink(plan);
        downloadColumn.appendChild(downloadLink);

        container.appendChild(tableColumn);
        container.appendChild(downloadColumn);

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

let planService = new PlanService();

export default planService;