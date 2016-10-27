import statsService from './StatsService';
import nutritionService from './NutritionService';

(function() {
	let appContainer = document.createElement('div');
	appContainer.id = 'app';
    appContainer.className = 'container';

    statsService.render(appContainer);
    nutritionService.render(appContainer);

	statsService.buttonClick(() => {
		let values = statsService.getValues();
        if(!values.hasErrors) {
            statsService.hide();
            nutritionService.show();

            alert(JSON.stringify(values.stats));

        }
	});

	document.body.append(appContainer);
})();