import * as inputValues from '../constants/InputValues'

const MALE_PROTEIN_FACTORS = {
    small: { minWeight: 0, factor: 1.0 },
    medium: { minWeight: 200, factor: 0.9 },
    large: { minWeight: 241, protein: 0.8 }
};
const FEMALE_PROTEIN_FACTORS = {
    small: { minWeight: 0, factor: 1.0 },
    medium: { minWeight: 170, factor: 0.9 },
    large: { minWeight: 201, factor: 0.8 }
};
const MALE_FAT_FACTOR = 0.3;
const FEMALE_FAT_FACTOR = 0.25;


class CalculatorService {
    calculatePlan(stats, nutrition) {
        let plan = [];

        let isMale = stats.gender === inputValues.MALE;
        let isGainer = stats.goal === inputValues.GAINER;

        let weekOneTwo = calculateWeekOneTwo(isMale, stats.weight, nutrition);
        let weekThreeFour = calculateWeekThreeFour(isMale, isGainer, weekOneTwo);
        let weekFiveSix = calculateWeekFiveSix(isGainer, weekThreeFour);

        plan.push(weekOneTwo);
        plan.push(weekThreeFour);
        plan.push(weekFiveSix);

        return plan;
    }
}

function calculateWeekOneTwo(isMale, weight, nutrition) {
    let proteinAvg = Math.ceil((nutrition.dayOne.protein + nutrition.dayTwo.protein + nutrition.dayThree.protein) / 3);
    let fatAvg = Math.ceil((nutrition.dayOne.fat + nutrition.dayTwo.fat + nutrition.dayThree.fat) / 3);
    let carbsAvg = Math.ceil((nutrition.dayOne.carbs + nutrition.dayTwo.carbs + nutrition.dayThree.carbs) / 3);

    let proteinFactor = calculateProteinFactor(isMale, weight);
    let fatFactor = calculateFatFactor(isMale);

    return {
        protein: Math.ceil(weight * proteinFactor),
        fat: Math.ceil((fatFactor * ((proteinAvg * 4) + (carbsAvg * 4) + (fatAvg * 9))) / 9),
        carbs: carbsAvg
    }
}

function calculateProteinFactor(isMale, weight) {
    let proteinFactorData = isMale ? MALE_PROTEIN_FACTORS : FEMALE_PROTEIN_FACTORS;

    if (weight >= proteinFactorData.large.weight) {
        return proteinFactorData.large.factor;
    }
    else if(weight >= proteinFactorData.medium.weight) {
        return proteinFactorData.medium.factor;
    }

    return proteinFactorData.small.factor;
}

function calculateFatFactor(isMale) {
    return isMale ? MALE_FAT_FACTOR : FEMALE_FAT_FACTOR;
}

function calculateWeekThreeFour(isMale, isGainer, weekOneTwo) {
    let carbFactor = 0.95;
    if(isGainer) {
        carbFactor = isMale ? 1.10 : 1.05;
    }

    return {
        protein: weekOneTwo.protein,
        fat: weekOneTwo.fat,
        carbs: Math.ceil(weekOneTwo.carbs * carbFactor)
    }
}

function calculateWeekFiveSix(isGainer, weekThreeFour) {
    let carbFactor = 0.95;
    if(isGainer) {
        carbFactor = 1.05;
    }

    return {
        protein: weekThreeFour.protein,
        fat: weekThreeFour.fat,
        carbs: Math.ceil(weekThreeFour.carbs * carbFactor)
    }
}

let instance = new CalculatorService();

export default instance;