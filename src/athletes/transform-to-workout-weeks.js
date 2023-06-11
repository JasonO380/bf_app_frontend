const transformToWorkoutWeeks = (data) => {
    return data.map((yearData) => {
        const monthsWithWeeks = yearData.months.map((monthData) => {
            const weeks = [];
            let currentWeek = [];

            // Sort the days in ascending order
            const sortedDays = [...monthData.days].sort((a, b) => a.day - b.day);

            sortedDays.forEach((day, index) => {
                currentWeek.push(day);
                console.log(day)

                // If it's the last day of the week (Saturday) or the last day of the array, we push the current week to the weeks array
                if (day.dayOfWeek === 'Saturday' || day === sortedDays[sortedDays.length - 1]) {
                    currentWeek.reverse();
                    weeks.push(currentWeek);
                    currentWeek = [];
                }

                weeks.reverse();
            });

            return {
                ...monthData,
                weeks: weeks,
            };
        });

        return {
            ...yearData,
            months: monthsWithWeeks,
        };
    });
};

export default transformToWorkoutWeeks;
