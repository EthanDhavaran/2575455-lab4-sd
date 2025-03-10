const button = document.getElementById("getCountry");
const input = document.getElementById("Country");

button.addEventListener("click", async function(){
    const country = input.value;
        

    const url = `https://restcountries.com/v3.1/name/${country}`;
    try {
        const response = await fetch(url);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
    }

        const json = await response.json();
        const data = json[0];
        const bordering = data.borders;
        document.getElementById("country-info").innerHTML =
        `<ul>
            <li>Capital: ${data.capital?.[0]}</li>
            <li>Population: ${data.population}</li>
            <li>Region: ${data.region}</li>
            <li><img src=${data.flags.png}></li>
        </ul>`
        const url1 = `https://restcountries.com/v3.1/alpha?codes=${bordering}`
        try {
            const response = await fetch(url1);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

        const json1 = await response.json();
        for(let i = 0; i<bordering.length;i++){
            const data1 = json1[i];
            border = document.createElement(bordering[i]);
            border.innerHTML = 
            `<ul>
                <li>${data1.name.common}:</li>
                <li><img src=${data1.flags.png}></li>
            </ul>`
            document.getElementById("bordering-countries").appendChild(border);
        }
        } catch (error) {
            console.error(error.message);
        }
    } catch (error) {
        console.error(error.message);
    }
});