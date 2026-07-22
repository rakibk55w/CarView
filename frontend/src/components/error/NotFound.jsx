import ErrorPage from "../../pages/ErrorPage";

export default function NotFound() {
    return (
        <ErrorPage
            errorCode="404"
            title="Page Not Found"
            message="The page you are looking for does not exist or may have been moved."
        />
    );
}