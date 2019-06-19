module.exports = {
    "title": "Director",
    "description": "Director that produces the movie",
    "type": "object",
    "properties": {
        "name": {
            "description": "Name of the director",
            "type": "string"
        },
        "decription": {
            "description": "A description of the director",
            "type": "string"
        },
        "gender": {
            "description": "The gender of the director",
            "type": "string"
        },
        "awards": {
            "description": "Awards that the director have",
            "type": "number"
        },
        "image": {
            "description": "Image that the director have",
            "type": "string"
        }
    },
    "required": [
        "name",
        "decription",
        "awards",
        "gender"
    ]
}