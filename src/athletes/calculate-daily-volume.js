const CalculateDailyVolume = (sessions) => {
    if (!sessions) {
        return null; // Return null when sessions is falsy
    }
    let dailyTotal = 0;
    sessions.map((session) => {
        const reps = session.reps || 1;
        const rounds = session.rounds || 1;
        const weight = session.weight || 0;

        const initialTotal = reps * rounds * weight;
        dailyTotal += initialTotal;
    });
    return dailyTotal;
};

export default CalculateDailyVolume;
