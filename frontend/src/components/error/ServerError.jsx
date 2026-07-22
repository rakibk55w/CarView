import ErrorPage from "../../pages/ErrorPage";

export default function ServerError() {
    return (
        <ErrorPage
            errorCode="500"
            title="Something Went Wrong"
            message="Something went wrong on our end. Please try again later."
        />
    );
}