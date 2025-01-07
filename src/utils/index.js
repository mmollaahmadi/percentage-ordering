export const prepareNumbersToDisplay = (numbers) => {
    try {
        if (!numbers) return numbers;
        return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } catch (e) {
        console.error(e);
    }
}
