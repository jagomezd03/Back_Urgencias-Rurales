class Pacient {
    constructor(id, name, lastname, birthdate, cellphone, city, municipality, address, rh, height, weight, allergies){
        this.id= id;
        this.name = name;
        this.lastname= lastname;
        this.birthdate =birthdate;
        this.cellphone = cellphone;
        this.city = city;
        this.municipality = municipality;
        this.address = address;
        this.rh = rh;
        this.height = height;
        this.weight = weight;
        this.allergies = allergies;
    }
}

module.exports = Pacient;