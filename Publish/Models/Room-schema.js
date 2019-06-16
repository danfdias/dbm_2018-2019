module.exports = {
    "title": "Room",
    "description": "Room where user see a movie",
    "type": "object",
    "properties": {
        "numero": {
            "description": "Number of the room",
            "type": "integer"
        }
    },
    "required": [
        "numero"
    ],
    "references": [
        {
            "model": "Movie",
            "relation": "1-M"
        }
    ]
}