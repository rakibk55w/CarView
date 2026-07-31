export default function FormSection({
    title,
    children,
    className = "",
}) {
    return (
        <section>

            <h3 className="
                mb-6
                border-b
                border-gray-200
                pb-2
                text-center
                text-2xl
                font-semibold
                dark:border-gray-700">

                {title}

            </h3>

            <div className={`
                grid
                gap-6
                md:grid-cols-2
                ${className}`}>

                {children}

            </div>

        </section>
    );
}