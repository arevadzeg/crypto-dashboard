const formatMinMaxValue = (value: number): string => {
    if (value >= 1000000) {
        return (Math.floor(value / 100000) * 100000).toLocaleString();
    } else if (value >= 1000) {
        return (Math.floor(value / 100) * 100).toLocaleString();
    } else if (value >= 10) {
        return Math.floor(value).toString();
    } else if (value >= 1) {
        return value.toFixed(2);
    }

    const decimalPlaces = Math.max(2, Math.abs(Math.floor(Math.log10(value))));
    return value.toFixed(decimalPlaces);
};



export default formatMinMaxValue