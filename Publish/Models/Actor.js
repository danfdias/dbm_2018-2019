class Actor {
    constructor (name,decription,awards,gender,height,weight,curiosities) {
        this.name = name;
        this.decription = decription;
        this.awards = awards;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.curiosities = curiosities;
        
        Object.defineProperty(this, "awards",{ enumerable: false });
    }
}