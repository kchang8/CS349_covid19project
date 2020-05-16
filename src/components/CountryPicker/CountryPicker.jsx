import React, { useState, useEffect } from 'react';
import { NativeSelect , FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange, handleChartChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async() => {
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();
    }, [setFetchedCountries]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
            <NativeSelect defaultValue=""onChange={(e) => handleChartChange(e.target.value)} >
                <option value="Line">Last 100 Days</option>
                <option value="Bar">Current</option>
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;