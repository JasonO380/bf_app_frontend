const calculateActivityLevel = (bmr) => {
    const activityLevels = {
        sedentary: bmr * 1.2,
        lightlyActive: bmr * 1.375,
        moderatelyActive: bmr * 1.55,
        veryActive: bmr * 1.725,
        extraActive: bmr * 1.9,
    };

    return activityLevels;
};

export default calculateActivityLevel;

