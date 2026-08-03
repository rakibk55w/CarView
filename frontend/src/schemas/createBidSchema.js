import * as Yup from "yup";

export const initialCreateBidValues = { 
    bid: "", 
};

export const createBidSchema = ({
    basePrice, 
    currentHighestBid
}) => { 
    const hasHighestBid = 
        currentHighestBid !== null && 
        currentHighestBid !== undefined && 
        Number(currentHighestBid) !== 0; 

    const minimumBid = hasHighestBid 
        ? Number(currentHighestBid) + 1 
        : Number(basePrice);

    return Yup.object({ 
        bid: Yup.number() 
            .typeError("Bid must be a valid number") 
            .integer("Bid must be an integer") 
            .required("") 
            .min(minimumBid, hasHighestBid 
                ? `Bid must be greater than ${currentHighestBid}` 
                : `Bid must be at least ${basePrice}` 
            ), 
        }
    );
};