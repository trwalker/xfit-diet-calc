import calculatorService from './CalculatorService';
import domService from './DomService';


let container = null;

class PlanService {

    render(appContainer, stats, nutrition) {
        container = domService.createRow();
        let tableColumn = domService.createColumn(12, 6);

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