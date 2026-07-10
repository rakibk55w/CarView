import { formatCurrency } from "../../utils/formatCurrency";

export default function AuctionPriceCard({
    title,
    value,
    color
}) {
    const styles = {
        base: {
            container: "bg-primary-600",
            text: "text-primary-100",
        },

        bid: {
            container: "bg-green-600",
            text: "text-green-100",
        },
    };

    const style = styles[color];

    return (
        <div className={`
            h-full
            rounded-xl
            px-4
            py-3
            text-white
            shadow
            ${style.container}`}>

            <p className={`
                text-xs
                uppercase
                tracking-wide
                ${style.text}`}>
                {title}
            </p>

            <p className="
                mt-1
                text-xl
                font-bold">
                {formatCurrency(value)}
            </p>
        </div>
    );
}