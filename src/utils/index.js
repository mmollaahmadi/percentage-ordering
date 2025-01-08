export const prepareNumbersToDisplay = (numbers) => {
    try {
        if (!numbers) return numbers;
        return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } catch (e) {
        console.error(e);
    }
}

export const preparedTimeToDisplay = (time) => {
    try {
        const date = new Date(time * 1000);
        return `${date.getUTCHours()}:${date.getUTCMinutes()}`;
    } catch (e) {
        console.error(e);
        return "-"
    }
}
