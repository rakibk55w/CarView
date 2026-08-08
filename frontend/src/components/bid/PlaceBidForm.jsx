import { useState } from "react";
import { Formik, Form } from "formik";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import axiosAuthInstance from "../../api/axiosAuthInstance";
import FormField from "../form/FormField";
import CustomButton from "../button/CustomButton";
import useAuth from "../../hooks/useAuth";
import { createBidSchema, initialCreateBidValues } from "../../schemas/createBidSchema";

export default function PlaceBidForm({
    ownerId, 
    auctionId,
    basePrice, 
    currentHighestBid,
    onBidSuccess
}) {
    const { user, isAuthenticated } = useAuth(); 
    const [isSubmitting, setIsSubmitting] = useState(false); 
    
    if (user?.id === ownerId) { 
        return null; 
    }

    const minimumBid = currentHighestBid !== null && Number(currentHighestBid) !== 0 
        ? Number(currentHighestBid) + 1 
        : Number(basePrice);

    const handleSubmit = async (values, { resetForm }) => { 
        if (!isAuthenticated) {
            showErrorToast("You must be logged in to place bids.");
            return;
        }
        
        try { 
            setIsSubmitting(true); 
            
            const response = await axiosAuthInstance.post(
                "/create-bid", 
                { 
                    auction_id: auctionId, 
                    bid_amount: Number(values.bid), 
                } 
            ); 
            
            showSuccessToast(response.data.message); 
            
            onBidSuccess?.(Number(values.bid)); 
            
            resetForm(); 
        } catch (error) { 
            showErrorToast( 
                error.response?.data?.message || 
                "Failed to place bid" 
            ); 
        } finally { 
            setIsSubmitting(false); 
        } 
    };

    return ( 
        <div onClick={(event) => 
                event.stopPropagation()
            } 
            onMouseDown={(event) => 
                event.stopPropagation()
            }> 
        
            <Formik 
                initialValues={initialCreateBidValues} 
                validationSchema={
                    createBidSchema({
                        basePrice,
                        currentHighestBid
                    })
                } 
                onSubmit={handleSubmit}> 
                <Form className=" 
                    grid 
                    grid-cols-1 
                    gap-4 
                    sm:grid-cols-[1fr_auto] 
                    sm:items-start"> 
                    <FormField 
                        name="bid" 
                        numberFormat 
                        placeholder={`Minimum bid: ${minimumBid}`} 
                    /> 
                    <div className=" sm:pt-1"> 
                        <CustomButton className="
                            w-full
                            px-4"
                            type="submit" 
                            disabled={isSubmitting}> 
                            
                            {isSubmitting 
                                ? "Placing bid..." 
                                : "Place your bid"} 
                        </CustomButton> 
                    </div> 
                </Form> 
            </Formik> 
        </div> 
    ); 
}