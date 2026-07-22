import ErrorPage from "../../pages/ErrorPage";

export default function Unauthorized() {
    return (
        <ErrorPage
            errorCode="401"
            title="Unauthorized"
            message="You need to be logged in to access this page."
        />
    );
}