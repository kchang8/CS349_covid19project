import axios from 'axios';


export const fetchData = async (country, chart) => {
    if(chart ==="Bar"){
        console.log("we fetching bar data BOII")
        return fetchBarData(country);
    }
    else{
        return fetchDailyData(country);
    }
}

export const fetchBarData = async(country) =>{
    //let changeableUrl = url;
    let changeableUrl = "";
    console.log("country",country)

    if(country) {
        changeableUrl = `https://corona.lmao.ninja/v2/countries/${country}`;
    }
    else{
        changeableUrl = 'https://corona.lmao.ninja/v2/all';
    }
    
    try {
        const { data: { cases:confirmed, recovered, deaths, updated }} = await axios.get(changeableUrl);
        var lastUpdate = new Date(updated);
        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.log(error);
        console.log("we here");
    }
}
export const fetchDailyData = async (country) => {
    let tempUrl = ''
    if(country){
        console.log("we switched countries", country);
        tempUrl = `https://corona.lmao.ninja/v2/historical/${country}?lastdays=100`;
        console.log("Here is the tempURL", tempUrl);
    }
    else{
        tempUrl = 'https://corona.lmao.ninja/v2/historical/all?lastdays=100';
    }
    try { 
        const { data:data2 } = await axios.get(tempUrl);
        console.log("Country in teh resonse:",data2.country);
        var modifiedData2 = [];
        var dates;
        if(country){
            for( dates in data2.timeline.cases){
                modifiedData2.push({
                    confirmed: data2.timeline.cases[dates],
                    deaths: data2.timeline.deaths[dates],
                    date: dates
                })
            }
        }
        else{
            for( dates in data2.cases){
                modifiedData2.push({
                    confirmed: data2.cases[dates],
                    deaths: data2.deaths[dates],
                    date: dates
                })
            }
        }
        console.log("here is the data inside of the api call",modifiedData2);
        return modifiedData2;
    } catch (error) {

    }
}

export const fetchCountries = async () => {
    let url = 'https://covid19.mathdro.id/api';
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);

    } catch (error) {
        console.log(error);
    }
}