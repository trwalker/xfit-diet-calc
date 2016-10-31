import weightComponent from './WeightComponent';
import nutritionComponent from './NutritionComponent';
import planComponent from './PlanComponent';

(function() {
	let appContainer = document.createElement('div');
	appContainer.id = 'app';
    appContainer.className = 'container';

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