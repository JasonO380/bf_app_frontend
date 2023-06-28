const calculateMacroDistribution = (calorieTotal) => {
    console.log(calorieTotal);
    let highCarb = {};
    let mediumCarb = {};
    let lowCarb = {};

    highCarb.carbohydrates = Math.round((calorieTotal * 0.45) / 4);
    highCarb.protein = Math.round((calorieTotal * 0.35) / 4);
    highCarb.fats = Math.round((calorieTotal * 0.2) / 9);

    mediumCarb.carbohydrates = Math.round((calorieTotal * 0.3) / 4);
    mediumCarb.protein = Math.round((calorieTotal * 0.35) / 4);
    mediumCarb.fats = Math.round((calorieTotal * 0.35) / 9);

    lowCarb.carbohydrates = Math.round((calorieTotal * 0.15) / 4);
    lowCarb.protein = Math.round((calorieTotal * 0.35) / 4);
    lowCarb.fats = Math.round((calorieTotal * 0.50) / 9);

    return { highCarb, mediumCarb, lowCarb };
};

export default calculateMacroDistribution;
