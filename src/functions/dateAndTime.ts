export const getDate = (dateAndTime: string): string => {
    const date = new Date(dateAndTime);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

export const getTime = (dateAndTime: string): string => {
    const date = new Date(dateAndTime);
    return date.toTimeString().split(' ')[0].substring(0, 5);
};