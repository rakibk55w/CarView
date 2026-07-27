export default function formatDateForInput(date) {
    if (!date) {
        return "";
    }

    return date.slice(0, 10);
}