const calculateMacroDistribution = (calorieTotal) => {
    console.log(calorieTotal);
    let highCarb = {};
    let mediumCarb = {};
    let lowCarb = {};

    highCarb.carbohydrates = Math.round((calorieTotal * 0.45) / 4);
    highCarb.protein = Math.round((calorieTotal * 0.30) / 4);
    highCarb.fats = Math.round((calorieTotal * 0.25) / 9);

    mediumCarb.carbohydrates = Math.round((calorieTotal * 0.3) / 4);
    mediumCarb.protein = Math.round((calorieTotal * 0.30) / 4);
    mediumCarb.fats = Math.round((calorieTotal * 0.40) / 9);

    lowCarb.carbohydrates = Math.round((calorieTotal * 0.15) / 4);
    lowCarb.protein = Math.round((calorieTotal * 0.30) / 4);
    lowCarb.fats = Math.round((calorieTotal * 0.55) / 9);

    return { highCarb, mediumCarb, lowCarb };
};

export default calculateMacroDistribution;
