module.exports = {
    "title": "Actor",
    "description": "Actor that participates in movies",
    "type": "object",
    "properties": {
        "name": {
            "description": "Name of the actor",
            "type": "string"
        },
        "decription": {
            "description": "A description of the actor",
            "type": "string"
        },
        "awards": {
            "description": "Awards that the actor have",
            "type": "string"
        },
        "gender": {
            "description": "The gender of the actor",
            "type": "string"
        },
        "height": {
            "description": "The height of the actor",
            "type": "number"
        },
        "weight": {
            "description": "The weight of the actor",
            "type": "number"
        },
        "curiosities": {
            "description": "Curiosities about the actor",
            "type": "string"
        }
    },
    "required": [
        "name",
        "decription",
        "gender",
        "height",
        "weight",
        "curiosities"
    ]
}