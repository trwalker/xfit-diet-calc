import domService from './DomService';

let container = null;

class PlanService {

    render(appContainer) {
        container = domService.createRow();
        let column = domService.createColumn();

        let placeHolder = document.createElement('span');
        placeHolder.innerText = 'Get er done';

        column.appendChild(placeHolder);

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