import axios from 'axios';


export const fetchData = async (country, chart) => {
    if(chart ==="Bar"){
        return fetchBarData(country);
    }
    else{
        return fetchDailyData(country);
    }
}

export const fetchMarkerData = async() =>{

    var changeableUrl = `https://corona.lmao.ninja/v2/countries`;
       
    try {
        const { data} = await axios.get(changeableUrl);
        const geoJson = { 
            type: 'FeatureCollection',
            features: data.map((country = {}) => {
              const { countryInfo = {} } = country;
              const { lat, long: lng } = countryInfo;
              return {
                type: 'Feature',
                properties: {
                  ...country,
                },
                geometry: {
                  type: 'Point',
                  coordinates: [ lng, lat ]
                }
              }
            })
          }
        return geoJson;
    } catch (error) {
        console.log(error);
        console.log("we here");
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
        console.log("Country in the resonse:",data2.country);
        var modifiedData2 = [];
        var dates;
        console.log("This is the data from the daily", data2);
        if(country){
            for( dates in data2.timeline.cases){
                modifiedData2.push({
                    confirmed: data2.timeline.cases[dates],
                    deaths: data2.timeline.deaths[dates],
                    date: dates
                })
            }
            console.log("Data going to linedata",modifiedData2);
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
        return modifiedData2;
    } catch (error) {
        return [];
    }
}

export const fetchCountries = async () => {
    let url = 'https://corona.lmao.ninja/v2/countries';
    try {
        const { data } = await axios.get(`${url}`);
        console.log("fetchcountries",data)
        return data.map((element) => element.country);

    } catch (error) {
        console.log(error);
    }
}