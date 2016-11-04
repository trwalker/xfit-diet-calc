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
const MALE_FAT_FACTOR = 21;
const FEMALE_FAT_FACTOR = 27;


class CalculatorService {
    calculatePlan(stats, nutrition) {
        const plan = [];

        const isMale = stats.gender === inputValues.MALE;
        const isGainer = stats.goal === inputValues.GAINER;

        const weekOneTwo = calculateWeekOneTwo(isMale, stats.weight, nutrition);
        const weekThreeFour = calculateWeekThreeFour(isMale, isGainer, weekOneTwo);
        const weekFiveSix = calculateWeekFiveSix(isGainer, weekThreeFour);

        plan.push(weekOneTwo);
        plan.push(weekThreeFour);
        plan.push(weekFiveSix);

        return plan;
    }
}

function calculateWeekOneTwo(isMale, weight, nutrition) {
    const proteinAvg = Math.ceil((nutrition.dayOne.protein + nutrition.dayTwo.protein + nutrition.dayThree.protein) / 3);
    // const fatAvg = Math.ceil((nutrition.dayOne.fat + nutrition.dayTwo.fat + nutrition.dayThree.fat) / 3);
    const carbsAvg = Math.ceil((nutrition.dayOne.carbs + nutrition.dayTwo.carbs + nutrition.dayThree.carbs) / 3);

    const proteinFactor = calculateProteinFactor(isMale, weight);
    const fatFactor = calculateFatFactor(isMale);

    /*****************************************************************

    x = fat week one/two
    x = (fatFactor * ((proteinAvg * 4) + (carbsAvg * 4) + (9x)) / 9)

     Male:
     x = (.30 * ((proteinAvg * 4) + (carbsAvg * 4) + (9x)) / 9)
     9x = .30 * ((proteinAvg * 4) + (carbsAvg * 4) + (9x))
     9x/.30 = (proteinAvg * 4) + (carbsAvg * 4) + (9x)
     30x - 9x = (proteinAvg * 4) + (carbsAvg * 4)
     21x = (proteinAvg * 4) + (carbsAvg * 4)

     x = ((proteinAvg * 4) + (carbsAvg * 4)) / 21

     Female:
     x = (.25 * ((proteinAvg * 4) + (carbsAvg * 4) + (9x)) / 9)
     9x = .25 * ((proteinAvg * 4) + (carbsAvg * 4) + (9x))
     9x/.25 = (proteinAvg * 4) + (carbsAvg * 4) + (9x)
     36x - 9x = (proteinAvg * 4) + (carbsAvg * 4)
     27x = (proteinAvg * 4) + (carbsAvg * 4)

     x = ((proteinAvg * 4) + (carbsAvg * 4)) / 27

    Universal Equation
    x = ((proteinAvg * 4) + (carbsAvg * 4)) / fatFactor

    ******************************************************************/

    return {
        protein: Math.ceil(weight * proteinFactor),
        fat: Math.ceil(((proteinAvg * 4) + (carbsAvg * 4)) / fatFactor),
        carbs: carbsAvg
    }
}

function calculateProteinFactor(isMale, weight) {
    const proteinFactorData = isMale ? MALE_PROTEIN_FACTORS : FEMALE_PROTEIN_FACTORS;

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

const instance = new CalculatorService();

export default instance;