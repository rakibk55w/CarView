export default function Footer() {
    return (
        <footer className="
            bg-primary-600 
            py-2 
            text-center 
            text-white">
            <p>
                © {new Date().getFullYear()} CarView • Made for testing purposes.
            </p>
        </footer>
    );
}