import statsService from './StatsService';
import nutritionService from './NutritionService';
import planService from './PlanService';

(function() {
	let appContainer = document.createElement('div');
	appContainer.id = 'app';
    appContainer.className = 'container';

    statsService.render(appContainer);
    nutritionService.render(appContainer);

	statsService.continueClick((hasErrors) => {
        if(!hasErrors) {
            statsService.hide();
            nutritionService.show();
        }
	});

    nutritionService.continueClick((hasErrors) => {
        if(!hasErrors) {
            nutritionService.hide();
            planService.render(appContainer);
            planService.show();
        }
    });

	document.body.append(appContainer);
})();