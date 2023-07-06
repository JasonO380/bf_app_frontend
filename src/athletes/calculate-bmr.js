const calculateBMR = (weight, height, age, gender) => {
    let bmr;

    if (gender === "male") {
        bmr = 10 * (weight / 2.20462) + 6.25 * height * 2.54 - 5 * age + 5;
    } else if (gender === "female") {
        bmr = 10 * (weight / 2.20462) + 6.25 * height * 2.54 - 5 * age - 161;
    } else {
        return "Can not perform calculation";
    }

    return Math.round(bmr);
};

export default calculateBMR;

