import aboutComponent from './components/AboutComponent';
import nutritionComponent from './components/NutritionComponent';
import planComponent from './components/PlanComponent';
import printPlanComponent from './components/PrintPlanComponent';
import domService from './services/DomService';

(function() {
    function render() {
        const appContainer = domService.getAppContainer();

        if(appContainer) {
            renderApplication(appContainer);
        }

        const printContainer = domService.getPrintContainer();

        if(printContainer) {
            renderPrintView(printContainer)
        }
    }

    function renderApplication(appContainer) {
        aboutComponent.render(appContainer);

        aboutComponent.setContinueCallback(() => {
            aboutComponent.hide();
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