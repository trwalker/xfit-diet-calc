import domService from './DomService';

let container = null;

class PlanService {

    render(appContainer) {
        container = domService.createRow();
        let column = domService.createColumn();

        let table = domService.createNutritionTable([
            { protein: 30, fat: 12, carbs: 1200 },
            { protein: 35, fat: 20, carbs: 1500 },
            { protein: 40, fat: 24, carbs: 2000 },
        ]);

        column.appendChild(table);

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