import ProfilePictureCard from "../components/profile/ProfilePictureCard";
import ProfileInformationCard from "../components/profile/ProfileInformationCard";
import mockProfile from "../data/mockProfile";

export default function Profile() {
    return (
        <div className="
            mx-auto
            max-w-7xl
            px-4
            py-8">
            <div className="
                grid
                gap-8
                lg:grid-cols-[260px_1fr]">
                <ProfilePictureCard
                    profilePicture={mockProfile.profile_picture}
                    fullName={mockProfile.name}
                />

                <ProfileInformationCard
                    profile={mockProfile}
                />
            </div>
        </div>
    );
}