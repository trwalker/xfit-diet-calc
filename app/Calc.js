import statsService from './StatsService';
import nutritionService from './NutritionService';
import planService from './PlanService';

(function() {
	let appContainer = document.createElement('div');
	appContainer.id = 'app';
    appContainer.className = 'container';

    statsService.render(appContainer);
    nutritionService.render(appContainer);
    planService.render(appContainer);

	statsService.continueClick((values) => {
        if(!values.hasErrors) {
            statsService.hide();
            nutritionService.show();

            alert(JSON.stringify(values.stats));

        }
	});

    nutritionService.continueClick((values) => {
        if(!values.hasErrors) {
            nutritionService.hide();
            planService.show();

            alert(JSON.stringify(values.nutrition));

        }
    });

	document.body.append(appContainer);
})();