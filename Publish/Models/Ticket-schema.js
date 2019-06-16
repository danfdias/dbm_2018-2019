module.exports = {
    "title": "Ticket",
    "description": "Cinema ticket for user to buy",
    "type": "object",
    "properties": {
        "price": {
            "description": "Price of the ticket",
            "type": "number"
        }
    },
    "required": [
        "price"
    ],
    "references": [
        {
            "model": "Place",
            "relation": "1-1"
        },
        {
            "model": "Movie",
            "relation": "1-M"
        }
    ]
}