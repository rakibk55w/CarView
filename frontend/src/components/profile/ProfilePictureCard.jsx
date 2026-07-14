// import { formStyle } from "../../utils/formStyle";

const PLACEHOLDER_IMAGE = "https://placehold.co/600x600?text=Profile";

export default function ProfilePictureCard({
    profilePicture, fullName}) {
    return (
        <section className={`
            flex
            justify-center
            lg:justify-start`}>
            <div className="
                h-60
                w-60
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-gray-100
                dark:border-gray-700
                dark:bg-gray-900">
                <img className="
                    h-full
                    w-full
                    object-cover"
                    src={profilePicture || PLACEHOLDER_IMAGE}
                    alt={fullName}
                />
            </div>
        </section>
    );
}