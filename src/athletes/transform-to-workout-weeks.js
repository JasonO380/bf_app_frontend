const transformToWorkoutWeeks = (data) => {
    return data.map((yearData) => {
        const monthsWithWeeks = yearData.months.map((monthData) => {
            const weeks = [];
            let currentWeek = Array(7).fill(null); // Start with an empty week

        // Sort the days in ascending order by date
        const sortedDays = [...monthData.days].sort((a, b) => a.day - b.day);

        sortedDays.forEach((day) => {
            const dayOfWeek = day.dayOfWeek; // Get the day of the week as a string

            // Convert the day of the week to a number from 0 (Sunday) to 6 (Saturday)
            const dayOfWeekNumber = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(dayOfWeek);

            // Insert the day into the current week at the correct position
            currentWeek[dayOfWeekNumber] = day;

            // If it's Saturday, we push the current week to the weeks array and start a new week
            if (dayOfWeekNumber === 6) {
                weeks.push(currentWeek);
                currentWeek = Array(7).fill(null);
            }
        });

        // If the current week is not empty at the end of the month, we push it to the weeks array
        if (currentWeek.some(day => day !== null)) {
            weeks.push(currentWeek);
        }

            // Reverse the order of the weeks
            weeks.reverse();

            // Sort the days in ascending order
            // const sortedDays = [...monthData.days].sort((a, b) => a.day - b.day);

            // sortedDays.forEach((day, index) => {
            //     currentWeek.push(day);
            //     console.log(day)

            //     If it's the last day of the week (Saturday) or the last day of the array, we push the current week to the weeks array
            //     if (day.dayOfWeek === 'Saturday' || day === sortedDays[sortedDays.length - 1]) {
            //         currentWeek.reverse();
            //         weeks.push(currentWeek);
            //         currentWeek = [];
            //     }

            //     weeks.reverse();
            // });

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
