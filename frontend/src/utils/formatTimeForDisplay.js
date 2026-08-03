function formatTimeForDisplay(date) {
    if (!date)
        return "";

    return new Date(date)
        .toLocaleTimeString([], 
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            })
}

export default formatTimeForDisplay;