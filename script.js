document.getElementById('f1Form').addEventListener('submit', function (e) {
    e.preventDefault();

    const season = document.getElementById('season').value;
    const round = document.getElementById('round').value;

    fetchDriverStandings(season, round);
});

async function fetchDriverStandings(season, round) {
    try {
        const url = `https://ergast.com/api/f1/${season}/${round}/driverStandings.json`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            populateTable(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        } else {
            alert('Data not found for the season / round provided')
        }
    } catch (error) {
        alert('Error fetching data');
        console.error('Fetch Error', error);
    }
}


const constructorLogos = {
    'Mercedes': 'Homework/media/Mercedes_benz.jpeg',
    'Ferrari': 'Homework/media/ferrari.png',
    'Honda': 'Homework/media/Honda.jpeg',
    'Aston Martin': 'Homework/media/Aston_martin.png',
    'Renault': 'Homework/media/Renault.png',
};

function populateTable(driverStandings) {
    const table = document.getElementById('f1Table');

    //clear data?
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }


driverStandings.slice(0, 7).forEach(standing => {
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);

    cell1.textContent = standing.position;
    cell2.textContent = `${standing.Driver.givenName}${standing.Driver.familyName}`;
    // cell3.textContent = standing.Constructors[0].name;
    // cell4.textContent = standing.points;


const constructorName = standing.Constructors[0].name;
// const cell3 = row.insertCell(2);
if (constructorLogos[constructorName]) {
    const img = document.createElement('img');
    img.src = constructorLogos[constructorName];
    img.alt = constructorName;
    img.style.width = '30px';
    img.style.height = '30px';
    img.style.marginRight = '5px';
    cell3.appendChild(img);
}
cell3.appendChild(document.createTextNode(constructorName));

cell4.textContent = standing.points;
});
}
