const transformToWorkoutWeeks = (data) => {
    return data.map((yearData) => {
        const monthsWithWeeks = yearData.months.map((monthData) => {
            const weeks = [];
            let currentWeek = [];
            let previousDay = null;
            let weekStartDay = null;

            // Define the acceptable range for each day of the week
            const dayRanges = {
                Sunday: 0,
                Monday: 6,
                Tuesday: 5,
                Wednesday: 4,
                Thursday: 3,
                Friday: 2,
                Saturday: 1,
            };

            const dayOfWeek = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];

            const dayOfWeekValue = {
                Sunday:0,
                Monday:1,
                Tuesday:2,
                Wednesday:3,
                Thursday:4,
                Friday:5,
                Saturday:6
            }

            monthData.days.forEach((day, index) => {
                // If this is the first day we're processing and it's not Sunday,
                // we add null entries to currentWeek for the missing days
                if (index === 0 && day.dayOfWeek !== "Sunday") {
                    const missingDays = dayOfWeekValue[day.dayOfWeek];
                    for (let i = 0; i < missingDays; i++) {
                        currentWeek.push(null);
                    }
                }

                if (currentWeek.length === 7) {
                    weeks.push(currentWeek);
                    currentWeek = []; // Reset the current week
                }
                // Check if we should start a new week
                if (dayOfWeek.includes(day.dayOfWeek)) {
                    // Run the check with the previous day's data
                    if (
                        previousDay &&
                        previousDay.day - day.day > dayRanges[day.dayOfWeek]
                    ) {
                        // Set remaining values in currentWeek to null
                        const remainingDays = 7 - currentWeek.length;
                        for (let i = 0; i < remainingDays; i++) {
                            currentWeek.push(null);
                        }
                        weeks.push(currentWeek);
                        currentWeek = []; // Reset the current week
                    }

                    currentWeek.push(day);
                    weekStartDay = day.dayOfWeek; // Update the starting day of the current week
                }

                previousDay = day; // Update the previous day's data
            });

            // Push the remaining days of the last week
            if (currentWeek.length > 0) {
                weeks.push(currentWeek);
            }

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

// const transformToWorkoutWeeks = (data) => {
//     return data.map((yearData) => {
//         const monthsWithWeeks = yearData.months.map((monthData) => {
//             const weeks = [];
//             let currentWeek = [];
//             let previousDay = null;
//             let weekStartDay = null;

//             // Define the acceptable range for each day of the week
//             const dayRanges = {
//                 Sunday: 6,
//                 Monday: 5,
//                 Tuesday: 4,
//                 Wednesday: 3,
//                 Thursday: 2,
//                 Friday: 1,
//                 Saturday: 0,
//             };

//             monthData.days.forEach((day, index) => {
//                 const dayOfWeek = [
//                     "Sunday",
//                     "Monday",
//                     "Tuesday",
//                     "Wednesday",
//                     "Thursday",
//                     "Friday",
//                     "Saturday",
//                 ];

//                 if (currentWeek.length === 7) {
//                     weeks.push(currentWeek);
//                     currentWeek = []; // Reset the current week
//                 }
//                 console.log(previousDay)
//                 // Check if we should start a new week
//                 if (dayOfWeek.includes(day.dayOfWeek)) {
//                     // Run the check with the previous day's data
//                     if (previousDay && (previousDay.day - day.day) > dayRanges[day.dayOfWeek]) {
//                         // Set remaining values in currentWeek to null
//                         const remainingDays = 7 - currentWeek.length;
//                         for (let i = 0; i < remainingDays; i++) {
//                             currentWeek.push(null);
//                         }
//                         weeks.push(currentWeek);
//                         currentWeek = []; // Reset the current week
//                     }

//                     currentWeek.push(day);
//                     weekStartDay = day.dayOfWeek; // Update the starting day of the current week
//                 }

//                 previousDay = day; // Update the previous day's data
//             });

//             // Push the remaining days of the last week
//             if (currentWeek.length > 0) {
//                 weeks.push(currentWeek);
//             }

//             return {
//                 ...monthData,
//                 weeks: weeks,
//             };
//         });

//         return {
//             ...yearData,
//             months: monthsWithWeeks,
//         };
//     });
// };

// export default transformToWorkoutWeeks;

// const transformToWorkoutWeeks = (data) => {
//     return data.map((yearData) => {
//         const monthsWithWeeks = yearData.months.map((monthData) => {
//             const weeks = [];
//             let currentWeek = [];
//             let currentWeekStartDay = null;

//             monthData.days.forEach((day) => {
//                 if (currentWeek.length === 0) {
//                     currentWeekStartDay = day.dayOfWeek;
//                 }

//                 currentWeek.push(day);

//                 if (currentWeek.length === 7 || day.dayOfWeek === 6 || day.dayOfMonth === monthData.days.length) {
//                     weeks.push(currentWeek);
//                     currentWeek = [];
//                 }
//             });

//             return {
//                 ...monthData,
//                 weeks: weeks,
//             };
//         });

//         return {
//             ...yearData,
//             months: monthsWithWeeks,
//         };
//     });
// };

// const transformToWorkoutWeeks = (data) => { getting all data back with this one
//     return data.map((yearData) => {
//         const monthsWithWeeks = yearData.months.map((monthData) => {
//             const weeks = [];
//             let currentWeek = [];
//             let currentWeekStartDay = null;

//             monthData.days.forEach((day) => {
//                 if (currentWeek.length === 0) {
//                     currentWeekStartDay = day.dayOfWeek;
//                 }

//                 currentWeek.push(day);

//                 if (
//                     (day.dayOfWeek === 6 &&
//                         currentWeekStartDay !== "Saturday") || // End week on Saturday if it's not the start day
//                     day.dayOfMonth === monthData.days.length // End week on the last day of the month
//                 ) {
//                     weeks.push(currentWeek);
//                     currentWeek = [];
//                 }
//             });

//             // Add remaining days of the incomplete week
//             if (currentWeek.length > 0) {
//                 const remainingDays = 7 - currentWeek.length;
//                 for (let i = 0; i < remainingDays; i++) {
//                     currentWeek.push(null);
//                 }
//                 weeks.push(currentWeek);
//             }

//             return {
//                 ...monthData,
//                 weeks: weeks,
//             };
//         });

//         return {
//             ...yearData,
//             months: monthsWithWeeks,
//         };
//     });
// };

//Adjustments I made

// const transformToWorkoutWeeks = (data) => {
//     return data.map((yearData) => {
//         const monthsWithWeeks = yearData.months.map((monthData) => {
//             const weeks = [];
//             let currentWeek = [];
//             let previousDay = null;
//             let weekStartDay = null;

//             // Define the acceptable range for each day of the week
//             const dayRanges = {
//                 Sunday: 6,
//                 Monday: 5,
//                 Tuesday: 4,
//                 Wednesday: 3,
//                 Thursday: 2,
//                 Friday: 1,
//                 Saturday: 0,
//             };

//             monthData.days.forEach((day, index) => {
//                 const dayOfWeek = [
//                     "Sunday",
//                     "Monday",
//                     "Tuesday",
//                     "Wednesday",
//                     "Thursday",
//                     "Friday",
//                     "Saturday",
//                 ];

//                 if (currentWeek.length === 7) {
//                     weeks.push(currentWeek);
//                     currentWeek = []; // Reset the current week
//                 }

//                 // Check if we should start a new week
//                 if (dayOfWeek.includes(day.dayOfWeek)) {
//                     // Run the check with the previous day's data
//                     if (previousDay && (day.dayOfMonth - previousDay.dayOfMonth) > dayRanges[day.dayOfWeek]) {
//                         // Set remaining values in currentWeek to null
//                         const remainingDays = 7 - currentWeek.length;
//                         for (let i = 0; i < remainingDays; i++) {
//                             currentWeek.push(null);
//                         }
//                         weeks.push(currentWeek);
//                         currentWeek = []; // Reset the current week
//                     }

//                     currentWeek.push(day);
//                     weekStartDay = day.dayOfWeek; // Update the starting day of the current week
//                 }

//                 previousDay = day; // Update the previous day's data
//             });

//             // Push the remaining days of the last week
//             if (currentWeek.length > 0) {
//                 weeks.push(currentWeek);
//             }

//             return {
//                 ...monthData,
//                 weeks: weeks,
//             };
//         });

//         return {
//             ...yearData,
//             months: monthsWithWeeks,
//         };
//     });
// };
