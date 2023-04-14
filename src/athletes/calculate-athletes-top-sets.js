const CalculateTopSets = (sessions) => {
    const sessionsByMovement = {};

    // Group the sessions by movement
    sessions.forEach((ses) => {
        if (!sessionsByMovement[ses.movement]) {
            sessionsByMovement[ses.movement] = [ses];
        } else {
            sessionsByMovement[ses.movement].push(ses);
        }
    });

    const topSets = [];

    // Iterate through each movement group
    Object.values(sessionsByMovement).forEach((group) => {
        let topSet = group[0];

        // Find the session with the highest weight or lowest time
        group.forEach((ses) => {
            if (ses.weight > topSet.weight || ses.time < topSet.time) {
                topSet = ses;
            }
        });

        // Add the top set to the topSets array
        topSets.push(topSet);
    });

    return topSets;
};

// const CalculateTopSets = (sessions) => {
//     let topSet = sessions[0];  Initialize topSet as the first session in the array
//     sessions.forEach((ses) => {
//         if (ses.weight > topSet.weight || ses.time < topSet.time) {
//             topSet = ses;
//         }
//     });

//     console.log(topSet);
//     return topSet;
// };

export default CalculateTopSets;
