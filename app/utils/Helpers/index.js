export const FormatNumber = (Input) => {
    try {
        Input = Input != undefined ? `${Input}`?.replace(/,/g, '') : "";

        let formatted = Math.round(Input).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return formatted.substring(0, formatted.length - 3);
    } catch (error) {
        console.log(error);
    }

    return "";
};

export const CreateSignal = () => {
    return Math.random().toFixed(10);
};