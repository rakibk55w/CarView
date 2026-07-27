export default function decodeAccessToken(token) {
    if (!token) {
        return null;
    }

    try {
        return JSON.parse(
            atob(token.split(".")[1])
        );
    } catch {
        return null;
    }
}