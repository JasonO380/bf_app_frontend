const calculateMacroDistribution = (calorieTotal) => {
    let highCarb = {};
    let mediumCarb = {};
    let lowCarb = {};

    const proteinCalories = Math.round(calorieTotal * 0.3);
    const carbohydrateCalories = Math.round(calorieTotal * 0.4);
    const fatCalories = Math.round(calorieTotal * 0.3);

    highCarb.carbohydrates = Math.round((carbohydrateCalories * 0.4) / 4);
    highCarb.protein = Math.round((proteinCalories * 0.3) / 4);
    highCarb.fats = Math.round((fatCalories * 0.2) / 9);

    mediumCarb.carbohydrates = Math.round((carbohydrateCalories * 0.35) / 4);
    mediumCarb.protein = Math.round((proteinCalories * 0.35) / 4);
    mediumCarb.fats = Math.round((fatCalories * 0.3) / 9);

    lowCarb.carbohydrates = Math.round((carbohydrateCalories * 0.2) / 4);
    lowCarb.protein = Math.round((proteinCalories * 0.5) / 4);
    lowCarb.fats = Math.round((fatCalories * 0.4) / 9);

    return { highCarb, mediumCarb, lowCarb };
};

export default calculateMacroDistribution;

