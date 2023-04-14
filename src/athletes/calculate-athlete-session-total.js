const CalculateAthletesSessionTotal = (sessions) => {
    const sessionTotal = [];
    const movements = new Map();

    sessions.forEach((session) => {
        const movement = movements.get(session.movement);

        if (!movement) {
            movements.set(session.movement, session);
            sessionTotal.push(session);
        } else {
            movement.weight += session.weight;
            movement.reps += session.reps;
            movement.rounds += session.rounds;
            movement.distance += session.distance;
            movement.time += session.time;
        }
    });

    return sessionTotal;
};

export default CalculateAthletesSessionTotal;
