import { Link } from "react-router-dom";
import { FiHome, FiRefreshCw } from "react-icons/fi";

export default function ErrorPage({
    errorCode = "404",
    title = "Page Not Found",
    message = "The page you are looking for does not exist or may have been moved.",
}) {
    const isServerError = errorCode.startsWith("5");

    return (
        <div className="
            flex
            min-h-[60vh]
            items-center
            justify-center
            text-center">
            <div className="
                w-full
                max-w-2xl">
                <p className="
                    mb-4
                    text-8xl
                    font-bold
                    tracking-tight
                    text-primary-500
                    sm:text-9xl">
                    {errorCode}
                </p>

                <h1 className="
                    mb-4
                    text-3xl
                    font-bold
                    text-gray-900
                    dark:text-white
                    sm:text-4xl">
                    {title}
                </h1>

                <p className="
                    mx-auto
                    mb-8
                    max-w-lg
                    text-gray-600
                    dark:text-gray-400">
                    {message}
                </p>

                <div className="
                    flex
                    flex-wrap
                    justify-center
                    gap-4">
                    <Link className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-primary-500
                        px-5
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-primary-600"
                        to="/">
                        <FiHome />
                        Go Home
                    </Link>

                    {isServerError && (
                        <button className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            border-gray-300
                            bg-white
                            px-5
                            py-3
                            font-medium
                            text-gray-700
                            transition
                            hover:bg-gray-100
                            dark:border-gray-600
                            dark:bg-gray-800
                            dark:text-gray-200
                            dark:hover:bg-gray-700"
                            onClick={() => window.location.reload()}>
                            <FiRefreshCw />
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}