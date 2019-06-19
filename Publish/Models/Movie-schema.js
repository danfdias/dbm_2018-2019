module.exports = {
    "title": "Movie",
    "description": "Movie to be watched",
    "type": "object",
    "properties": {
        "title": {
            "description": "Title of the movie",
            "type": "string"
        },
        "synopsis": {
            "description": "Synopsis of the movie",
            "type": "string"
        },
        "imdb_pontuation": {
            "description": "IMDB pontuation of the movie",
            "type": "number"
        },
        "awards": {
            "description": "Awards that movie has",
            "type": "number"
        },
        "language": {
            "description": "The language of the movie",
            "type": "string"
        },
        "budget": {
            "description": "The budget of the movie",
            "type": "number"
        },
        "duration": {
            "description": "The time of the movie",
            "type": "string"
        },
        "age_restriction": {
            "description": "The restriction of age that movie has",
            "type": "string"
        },
        "image": {
            "description": "The image that movie has",
            "type": "string"
        }
    },
    "required": [
        "title",
        "synopsis",
        "imdb_pontuation",
        "language",
        "duration",
        "age_restriction"
    ],
    "references": [
        {
            "model": "Actor",
            "relation": "M-M"
        },
        {
            "model": "Director",
            "relation": "M-M"
        },
        {
            "model": "Category",
            "relation": "M-M"
        }
    ]
}