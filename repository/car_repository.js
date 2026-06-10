const pool = require("../config/db");

const createCar = async (userId, carData) => {
    await pool.query(
        `INSERT INTO cars(
            owner_id,
            title, 
            description, 
            brand, 
            model, 
            trim, 
            manufacture_year, 
            fuel_type, 
            transmission_type, 
            drive_type, 
            engine_capacity_cc, 
            cylinder_count, 
            battery_capacity_kwh, 
            mileage_km, 
            color, 
            driving_position, 
            body_type, 
            door_count, 
            seat_count, 
            registration_number, 
            accident_history, 
            service_warranty, 
            ownership_count, 
            city,
            updated_at
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
            $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, NOW())`,
        [
            userId, carData.title, carData.description, carData.brand, carData.model, carData.trim, carData.manufacture_year, carData.fuel_type,
            carData.transmission_type, carData.drive_type, carData.engine_capacity_cc, carData.cylinder_count, carData.battery_capacity_kwh,
            carData.mileage_km, carData.color, carData.driving_position, carData.body_type, carData.door_count, carData.seat_count, 
            carData.registration_number, carData.accident_history, carData.service_warranty, carData.ownership_count, carData.city
        ]
    );
};

const findCarsByUserID = async (userId) => {
    const queryResult = await pool.query(
        `SELECT * FROM cars WHERE owner_id = $1 ORDER BY created_at DESC`,
        [userId]
    );

    return queryResult.rows;
};

const getCarDetailsByCarID = async (carId) => {
    const queryResult = await pool.query(
        `SELECT * FROM cars WHERE id = $1`,
        [carId]
    );

    return queryResult.rows[0];
};

const updateCarById = async (carId, userId, updatedCar) => {
    const queryResult = await pool.query(
        `
        UPDATE cars
        SET
            title = $1,
            description = $2,
            brand = $3,
            model = $4,
            trim = $5,
            manufacture_year = $6,
            fuel_type = $7,
            transmission_type = $8,
            drive_type = $9,
            engine_capacity_cc = $10,
            cylinder_count = $11,
            battery_capacity_kwh = $12,
            mileage_km = $13,
            color = $14,
            driving_position = $15,
            body_type = $16,
            door_count = $17,
            seat_count = $18,
            registration_number = $19,
            accident_history = $20,
            service_warranty = $21,
            ownership_count = $22,
            city = $23,
            updated_at = NOW()
        WHERE id = $24 AND owner_id = $25
        RETURNING *
        `,
        [
            updatedCar.title,
            updatedCar.description,
            updatedCar.brand,
            updatedCar.model,
            updatedCar.trim,
            updatedCar.manufacture_year,
            updatedCar.fuel_type,
            updatedCar.transmission_type,
            updatedCar.drive_type,
            updatedCar.engine_capacity_cc,
            updatedCar.cylinder_count,
            updatedCar.battery_capacity_kwh,
            updatedCar.mileage_km,
            updatedCar.color,
            updatedCar.driving_position,
            updatedCar.body_type,
            updatedCar.door_count,
            updatedCar.seat_count,
            updatedCar.registration_number,
            updatedCar.accident_history,
            updatedCar.service_warranty,
            updatedCar.ownership_count,
            updatedCar.city,
            carId,
            userId
        ]
    );

    return queryResult.rows[0];
};

const deleteCarByCarId = async (carId, userId) => {
    const queryResult = await pool.query(
        `DELETE FROM cars WHERE id = $1 AND owner_id = $2 RETURNING *`,
        [carId, userId]
    );

    return queryResult.rows[0];
};


module.exports = {
    createCar,
    findCarsByUserID,
    getCarDetailsByCarID,
    updateCarById,
    deleteCarByCarId
};