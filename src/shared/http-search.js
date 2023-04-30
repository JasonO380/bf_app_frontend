const httpSearch = async (query, auth) => {
    console.log(query);
    console.log(auth);
    let searchData;
    const url = `http://localhost:5000/api/movement/search/${query}`;
        console.log(url);
        try {
            const response = await fetch(
                `http://localhost:5000/api/movement/search/${query}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Issuer " + auth,
                    },
                }
            );
            const responseData = await response.json();
            console.log(responseData.movements);
            searchData = responseData.movements;
        } catch (err) {
            console.log(err)
        }
        return searchData;
};

export default httpSearch;