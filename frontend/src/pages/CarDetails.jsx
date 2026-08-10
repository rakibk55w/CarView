import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import CarPictureCard from "../components/car/CarPictureCard";
import CarInformationCard from "../components/car/CarInformationCard";

import axiosAuthInstance from "../api/axiosAuthInstance";

import { showErrorToast, showSuccessToast } from "../utils/toast";
import ConfirmationDialog from "../components/common/ConfirmationDialog";

export default function CarDetails() {
    const { carId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [carImage, setCarImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCarImageLoading, setIsCarImageLoading] = useState(true);
    const [isCarDeleting, setIsCarDeleting] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const isOwnCar = user?.id === car?.owner_id;

    useEffect(() => {
        async function fetchCar() {
            try {
                setIsLoading(true);

                const response = await axiosAuthInstance.get(
                    `/cars/${carId}`
                );

                setCar(response.data.data);
            }
            catch (error) {
                showErrorToast(
                    error.response?.data?.message ||
                    "Failed to fetch car."
                );
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchCar();
    }, [carId]);

    useEffect(() => {
        const fetchCarImage = async () => {
            try {
                setIsCarImageLoading(true);

                const response = await axiosAuthInstance.get(
                    `/cars/${carId}/images`
                );
                
                setCarImage(
                    response.data.data.images
                );
            } catch (error) {
                if (error.response?.status !== 404) {
                    showErrorToast(
                        error.response?.data?.message ||
                        "Failed to fetch profile picture"
                    );
                }

                setCarImage(null);
            }
            finally {
                setIsCarImageLoading(false);
            }
        };

        fetchCarImage();
    }, [carId]);

    const handleDeleteClick = () => {
        setShowDeleteDialog(true);
    };

    const handleCarDelete = async () => {
        try {
            setIsCarDeleting(true);

            const response = await axiosAuthInstance.delete(
                `/cars/${carId}`
            );

            showSuccessToast(
                response.data.message || 
                "Car deleted successfully."
            );

            setShowDeleteDialog(false);
            navigate("/my-cars");
            
        } catch (error) {
            showErrorToast(
                error.response?.data?.message ||
                "Failed to delete car."
            );
        }
        finally {
            setIsCarDeleting(false);
        }
    };

    return (
        <div className="
            mx-auto
            max-w-7xl
            px-4
            py-8">
            <div className="
                grid
                gap-8
                lg:grid-cols-[420px_1fr]">

                <CarPictureCard
                    carId={carId}
                    images={carImage}
                    title={car?.title || "Car image"}
                    isOwnCar={isOwnCar}
                    isLoading={isCarImageLoading}
                    setImages={setCarImage}
                />

                <CarInformationCard
                    car={car}
                    setCar={setCar}
                    isOwnCar={isOwnCar}
                    isLoading={isLoading}
                    onCarDelete={handleDeleteClick}
                />
            </div>

            <ConfirmationDialog
                isOpen={showDeleteDialog}
                title="Delete Car"
                message="Are you sure you want to delete this car? This action cannot be undone."
                confirmText={
                    isCarDeleting
                        ? "Deleting..."
                        : "Delete"
                }
                onConfirm={handleCarDelete}
                onCancel={() => setShowDeleteDialog(false)}
            />
        </div>
    );
}