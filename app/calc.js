import statsService from './StatsService';

(function() {
	let appContainer = document.createElement('div');
	appContainer.id = 'app';
    appContainer.className = 'container';

    statsService.render(appContainer);

	$('body').append(appContainer);
})();