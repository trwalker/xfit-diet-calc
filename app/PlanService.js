import domService from './DomService';

let container = null;

class PlanService {

    render(appContainer) {
        container = domService.createRow();
        let tableColumn = domService.createColumn(12, 6);

        let nutrition = [
            { protein: 30, fat: 12, carbs: 1200 },
            { protein: 35, fat: 20, carbs: 1500 },
            { protein: 40, fat: 24, carbs: 2000 },
        ];

        let table = domService.createNutritionTable(nutrition);
        tableColumn.appendChild(table);

        let downloadColumn = domService.createColumn(12, 12);

        let downloadLink = domService.createCsvDownloadLink(nutrition);
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