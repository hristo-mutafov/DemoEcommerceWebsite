export default function getDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}