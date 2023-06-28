const calculateMacroDistribution = (calorieTotal) => {
    console.log(calorieTotal);
    let highCarb = {};
    let mediumCarb = {};
    let lowCarb = {};

    highCarb.carbohydrates = Math.round((calorieTotal * 0.4) / 4);
    highCarb.protein = Math.round((calorieTotal * 0.4) / 4);
    highCarb.fats = Math.round((calorieTotal * 0.2) / 9);

    mediumCarb.carbohydrates = Math.round((calorieTotal * 0.35) / 4);
    mediumCarb.protein = Math.round((calorieTotal * 0.35) / 4);
    mediumCarb.fats = Math.round((calorieTotal * 0.3) / 9);

    lowCarb.carbohydrates = Math.round((calorieTotal * 0.2) / 4);
    lowCarb.protein = Math.round((calorieTotal * 0.5) / 4);
    lowCarb.fats = Math.round((calorieTotal * 0.3) / 9);

    return { highCarb, mediumCarb, lowCarb };
};

export default calculateMacroDistribution;
