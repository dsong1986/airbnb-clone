import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
    label:country.name.common,
    region:country.region,
    latlng: country.latlng,
    value:country.cca2,
    flag: country.flag,
}));

const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => (item.value === value))
    }
    return {
        getAll,
        getByValue
    }
}

export default useCountries