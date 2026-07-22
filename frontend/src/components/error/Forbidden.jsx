import ErrorPage from "../../pages/ErrorPage";

export default function Forbidden() {
    return (
        <ErrorPage
            errorCode="403"
            title="Access Denied"
            message="You do not have permission to access this page."
        />
    );
}