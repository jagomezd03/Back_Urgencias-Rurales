class Doctor {
    constructor(id,cc, name, lastname, birthdate, cellphone, city, municipality, address, rh, specialty, schedule){
        this.id= id;
        this.cc= cc;
        this.name = name;
        this.lastname= lastname;
        this.birthdate =birthdate;
        this.cellphone = cellphone;
        this.city = city;
        this.municipality = municipality;
        this.address = address;
        this.rh = rh;
        this.specialty = specialty;
        this.schedule = schedule;
    }
}

module.exports = Doctor;