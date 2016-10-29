import statsService from './StatsService';
import nutritionService from './NutritionService';
import planService from './PlanService';

(function() {
	let appContainer = document.createElement('div');
	appContainer.id = 'app';
    appContainer.className = 'container';

    let stats;
    let nutrition;

    statsService.render(appContainer);
    nutritionService.render(appContainer);

	statsService.continueClick((values) => {
        if(!values.hasErrors) {
            stats = values.stats;

            statsService.hide();
            nutritionService.show();
        }
	});

    nutritionService.continueClick((values) => {
        if(!values.hasErrors) {
            nutrition = values.nutrition;

            nutritionService.hide();
            planService.render(appContainer, stats, nutrition);
            planService.show();
        }
    });

	document.body.append(appContainer);
})();