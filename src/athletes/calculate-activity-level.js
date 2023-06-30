const calculateActivityLevel = (bmr) => {
    console.log(bmr)
    const activityLevels = {
        sedentary: Math.round(bmr * 1.2),
        lightlyActive: Math.round(bmr * 1.375),
        moderatelyActive: Math.round(bmr * 1.55),
        veryActive: Math.round(bmr * 1.725),
        extraActive: Math.round(bmr * 1.9),
    };

    return activityLevels;
};

export default calculateActivityLevel;
