const normalize = require("../utils/empty_string_normalizer");

class CreateCarRequestDto {
    constructor(car) {
        this.title = normalize(car.title);
        this.description = normalize(car.description);
        this.brand = normalize(car.brand);
        this.model = normalize(car.model);
        this.trim = normalize(car.trim);
        this.manufacture_year = normalize(car.manufacture_year);
        this.fuel_type = normalize(car.fuel_type);
        this.transmission_type = normalize(car.transmission_type);
        this.drive_type = normalize(car.drive_type);
        this.engine_capacity_cc = normalize(car.engine_capacity_cc);
        this.cylinder_count = normalize(car.cylinder_count);
        this.battery_capacity_kwh = normalize(car.battery_capacity_kwh);
        this.mileage_km = normalize(car.mileage_km);
        this.color = normalize(car.color);
        this.driving_position = normalize(car.driving_position);
        this.body_type = normalize(car.body_type);
        this.door_count = normalize(car.door_count);
        this.seat_count = normalize(car.seat_count);
        this.registration_number = normalize(car.registration_number);
        this.accident_history = normalize(car.accident_history);
        this.service_warranty = normalize(car.service_warranty);
        this.ownership_count = normalize(car.ownership_count);
        this.city = normalize(car.city);
    }

    static fromRequest(reqBody){
        return new CreateCarRequestDto(reqBody);
    }
}

module.exports = CreateCarRequestDto;