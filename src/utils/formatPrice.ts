export const formatPrice = (price: number | null): string => {
    const numericPrice = price !== null ? Number(price) : 0;
    return numericPrice.toFixed(2);
};