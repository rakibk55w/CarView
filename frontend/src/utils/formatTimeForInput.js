export default function formatTimeForInput (date) {
    if (!date) return null;

    return new Date(date).toISOString();
};