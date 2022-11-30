import dayjs from "dayjs";

const DF = {
    GetDateExtense: (value: Date) => {
        const date = dayjs(value);
        const month = DF.getMonthString(date.month());
        const day = date.date();
        const year = date.year();
        return `${day < 10 ? "0" + day : day} ${month} ${year}`;
    },
    getHoursExtense: (value: Date) => {
        const hours = value.getHours();
        const minutes = value.getMinutes();
        return `${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
        }`;
    },
    getMonthString: (mes: number) => {
        switch (mes) {
            case 0:
                return "Janeiro";
            case 1:
                return "Fevereiro";
            case 2:
                return "Março";
            case 3:
                return "Abril";
            case 4:
                return "Maio";
            case 5:
                return "Junho";
            case 6:
                return "Julho";
            case 7:
                return "Agosto";
            case 8:
                return "Setembro";
            case 9:
                return "Outubro";
            case 10:
                return "Novembro";
            case 11:
                return "Dezembro";
        }
    },
};

export default DF;
