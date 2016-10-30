const STATS_KEY = 'stats';
const NUTRITION_KEY = 'nutrition';

class StateService {
    constructor() {
        if(typeof(Storage) === 'undefined') {
            window.localStorage = {};

            window.localStorage.setItem = function(key, value) {
                window.localStorage[key] = value;
            }

            window.localStorage.getItem = function(key) {
                return window.localStorage[key];
            }
        }
    }

    getStats() {
        let statsData = localStorage.getItem(STATS_KEY);
        if(statsData) {
            return JSON.parse(statsData);
        }

        return {
            gender: null,
            weight: null,
            goal: null
        };
    }

    setStats(stats) {
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    }

    getNutrition() {
        let nutritionData = localStorage.getItem(NUTRITION_KEY);
        if(nutritionData) {
            return JSON.parse(nutritionData);
        }

        return {
            dayOne: {
                protein: null,
                fat: null,
                carbs: null
            },
            dayTwo: {
                protein: null,
                fat: null,
                carbs: null
            },
            dayThree: {
                protein: null,
                fat: null,
                carbs: null
            }
        };
    }

    setNutrition(nutrition) {
        localStorage.setItem(NUTRITION_KEY, JSON.stringify(nutrition));
    }
}

let stateService = new StateService();

export default stateService;