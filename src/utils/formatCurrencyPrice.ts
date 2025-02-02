function formatCurrencyPrice(value: number | string, toPrecision: number = 2): string {
    const num = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(num)) {
        throw new Error("Invalid number input");
    }

    return num.toLocaleString("en-US", { minimumFractionDigits: toPrecision, maximumFractionDigits: toPrecision });
}



export default formatCurrencyPrice