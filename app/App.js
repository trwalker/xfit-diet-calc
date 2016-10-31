import weightComponent from './WeightComponent';
import nutritionComponent from './NutritionComponent';
import planComponent from './PlanComponent';
import domService from './DomService';

(function() {
	let appContainer = domService.createAppContainer();

    weightComponent.render(appContainer);

	weightComponent.setContinueCallback(() => {
        weightComponent.hide();
        nutritionComponent.render(appContainer);
	});

    nutritionComponent.setContinueCallback(() => {
        nutritionComponent.hide();
        planComponent.render(appContainer);
    });

	document.body.append(appContainer);
})();