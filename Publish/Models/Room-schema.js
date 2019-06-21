module.exports = {
    "title": "Room",
    "description": "Room where user see a movie",
    "type": "object",
    "properties": {
        "number": {
            "description": "Number of the room",
            "type": "integer"
        }
    },
    "required": [
        "number"
    ],
    "references": [
        {
            "model": "Movie",
            "relation": "1-M"
        }
    ]
}