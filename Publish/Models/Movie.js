class Movie {
    constructor (title,synopsis,imdb_pontuation,awards,language,budget,duration,age_restriction) {
        this.title = title;
        this.synopsis = synopsis;
        this.imdb_pontuation = imdb_pontuation;
        this.awards = awards;
        this.language = language;
        this.budget = budget;
        this.duration = duration;
        this.age_restriction = age_restriction;
        
        Object.defineProperty(this, "awards","budget",{ enumerable: false });
    }
}