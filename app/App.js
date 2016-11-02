import weightComponent from './components/WeightComponent';
import nutritionComponent from './components/NutritionComponent';
import planComponent from './components/PlanComponent';
import printPlanComponent from './components/PrintPlanComponent';
import domService from './services/DomService';

(function() {
    function render() {
        let appContainer = domService.getAppContainer();

        if(appContainer) {
            renderApplication(appContainer);
        }

        let printContainer = domService.getPrintContainer();

        if(printContainer) {
            renderPrintView(printContainer)
        }
    }

    function renderApplication(appContainer) {
        weightComponent.render(appContainer);

        weightComponent.setContinueCallback(() => {
            weightComponent.hide();
            nutritionComponent.render(appContainer);
            nutritionComponent.show();
        });

        nutritionComponent.setContinueCallback(() => {
            nutritionComponent.hide();
            planComponent.render(appContainer);
            planComponent.show();
        });
    }

    function renderPrintView(printContainer) {
        printPlanComponent.render(printContainer);
    }

    render();
})();