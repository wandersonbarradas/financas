const formattedPrice = (price: number) => {
    let formattedPrice: string = price.toFixed(2);
    const centIndex = formattedPrice.lastIndexOf(".");
    if (centIndex !== -1) {
        const formattedPriceArr = formattedPrice.split("");
        formattedPriceArr[centIndex] = ",";
        formattedPrice = formattedPriceArr.join("");
    }
    return `${formattedPrice}`;
};

export default formattedPrice;
