import React from 'react';
import { Cards, Chart, CountryPicker , CovidMap} from './components';
import styles from './App.module.css';
import { fetchData, fetchMarkerData } from './api';

class App extends React.Component {
    state = {
        Totaldata:{},
        Linedata:[],
        country: '',
        chart:"Line"
    }

    async componentDidMount() {
        const fetchedData = await fetchData('',"Bar");
        const markerData = await fetchMarkerData();
        const lineData = await fetchData('',"Line");
        this.setState( {Totaldata:fetchedData, Linedata:lineData, MarkerData: markerData});
    }


    handleCountryChange = async (country) => {
        const{chart} = this.state
        const lineData = await fetchData(country,"Line");
        console.log("In the country change",lineData)
        const totalData = await fetchData(country, "Bar");
        this.setState({Totaldata:totalData, Linedata:lineData, country: country, chart:chart });

    }

    handleChartChange = async (chart) => {
        const{country} = this.state
        const lineData = await fetchData(country,"Line");
        const totalData = await fetchData(country, "Bar");
        this.setState({Totaldata:totalData, Linedata:lineData, chart:chart });

    }

    render() {

        const { Totaldata ,Linedata,MarkerData, country, chart } = this.state;
        console.log("Chart state", chart)
        console.log("This is dataTotal", Totaldata);
        console.log("This is line data", Linedata);
        console.log("This is MarkerData", MarkerData);
        

        return (
            <div className={styles.container}>
                <h1>COVID-19 Charts</h1>
                <div className={styles.container}>
                    <CovidMap clickHandler = {this.handleCountryChange} />
                </div>
                <Cards Totaldata={Totaldata} />
                <CountryPicker handleCountryChange={this.handleCountryChange} handleChartChange={this.handleChartChange} />
                <Chart data={Totaldata} LineData = {Linedata} country={country} chart = {chart} />
            </div>
        );
    }
}

export default App;