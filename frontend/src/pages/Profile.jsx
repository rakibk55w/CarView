import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfilePictureCard from "../components/profile/ProfilePictureCard";
import ProfileInformationCard from "../components/profile/ProfileInformationCard";
import ProfileSecurityCard from "../components/profile/ProfileSecurityCard";
import axiosAuthInstance from "../api/axiosAuthInstance";
import useAuth from "../hooks/useAuth";
import { showErrorToast } from "../utils/toast";

export default function Profile() {
    const { userId } = useParams();
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProfileImageLoading, setIsProfileImageLoading] = useState(true);

    const isOwnProfile = user.id === userId;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsLoading(true);

                const response = await axiosAuthInstance.get(
                    `/profile/${userId}`
                );

                setProfile(response.data.data);
            } catch (error) {
                showErrorToast(
                    error.response?.data?.message || "Failed to fetch profile"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                setIsProfileImageLoading(true);

                const response = await axiosAuthInstance.get(
                    `/profile/${userId}/image`
                );

                setProfileImage(
                    response.data.data.image_url
                );
            } catch (error) {
                if (error.response?.status !== 404) {
                    showErrorToast(
                        error.response?.data?.message ||
                        "Failed to fetch profile picture"
                    );
                }

                setProfileImage(null);
            }
            finally {
                setIsProfileImageLoading(false);
            }
        };

        fetchProfileImage();
    }, [userId]);

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
                    profilePicture={profileImage}
                    fullName={profile?.name}
                    isOwnProfile={isOwnProfile}
                    isLoading={isProfileImageLoading}
                />

                <div className="space-y-8">
                    <ProfileInformationCard
                        profile={profile}
                        setProfile={setProfile}
                        isOwnProfile={isOwnProfile}
                        isLoading={isLoading}
                    />

                    {isOwnProfile && (
                        <ProfileSecurityCard
                            profile={profile}
                            setProfile={setProfile}
                        />
                    )}
                </div>

            </div>
        </div>
    );
}