const CalculateDailyVolume = (sessions) => {
    let dailyTotal = 0;
    sessions.map((session)=> {
        const initialTotal = session.reps * session.weight;
        dailyTotal += initialTotal
    })
    return dailyTotal;
};

export default CalculateDailyVolume;