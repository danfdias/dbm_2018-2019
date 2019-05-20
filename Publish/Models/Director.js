class Director {
    constructor (name,decription,awards) {
        this.name = name;
        this.decription = decription;
        this.awards = awards;
        
        Object.defineProperty(this, "awards",{ enumerable: false });
    }
}