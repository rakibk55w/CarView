function formatDateForDisplay(date) {
    if (!date)
        return "";

    return new Date(date)
        .toLocaleDateString(
            "en-GB",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );
}

export default formatDateForDisplay;