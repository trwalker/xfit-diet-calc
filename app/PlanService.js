import domService from './DomService';

let container = null;

class PlanService {

    render(appContainer) {
        container = domService.createRow();
        let column = domService.createColumn();

        let nutrition = [
            { protein: 30, fat: 12, carbs: 1200 },
            { protein: 35, fat: 20, carbs: 1500 },
            { protein: 40, fat: 24, carbs: 2000 },
        ];

        let table = domService.createNutritionTable(nutrition);

        let downloadLink = domService.createCsvDownloadLink(nutrition);

        column.appendChild(table);
        column.appendChild(downloadLink);

        container.appendChild(column);
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