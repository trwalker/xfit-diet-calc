import statsService from './StatsService';

(function() {
	let appContainer = document.createElement('div');
	appContainer.id = 'app';
    appContainer.className = 'container';

    statsService.render(appContainer);
	statsService.buttonClick(() => {
		let values = statsService.getValues();
        if(!values.hasErrors) {
            alert(JSON.stringify(values.stats));
        }
	});

	document.body.append(appContainer);
})();