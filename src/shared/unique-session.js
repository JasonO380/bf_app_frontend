// Helper function to remove duplicate movements
const RemoveDuplicates = (sessions) => {
    const uniqueSessions = [];
    const movementExists = new Set();

    sessions.forEach((session) => {
        if (!movementExists.has(session.movement)) {
            movementExists.add(session.movement);
            uniqueSessions.push(session);
        } else {
            const existingSession = uniqueSessions.find(
                (s) => s.movement === session.movement
            );
            if (existingSession) {
                existingSession.weight.push(session.weight);
                existingSession.reps.push(session.reps);
                existingSession.rounds.push(session.rounds);
                existingSession.distance.push(session.distance);
                existingSession.time.push(session.time);
            }
        }
    });
    console.log(uniqueSessions);

    return uniqueSessions;
};

// const Duplicates = (sessions) => {
//     sessions.forEach((session) => {
//         const movementExists = sessions.find((s) => {
//             if (s.movement === movementExists) return s.movement;
//         });

//         if (foundSession) {
//             // Perform the desired action when a matching session is found
//             console.log("Found a matching session:", foundSession);
//         }
//     });
// };

export default RemoveDuplicates;
