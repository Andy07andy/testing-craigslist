let suits = ["♠", "♥", "♣", "♦"];

let chars = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let colorMap = {
    "♠": "darkslateblue",
    "♥": "brown",
    "♣": "darkgoldenrod",
    "♦": "teal",
}

let cards = []
for (let char of chars) {
    for (let suit of suits) {
       

        if (suit === "♥" || suit === "♦") {
            color = "red";
        }

        let card = {
            suit: suit,
            char: char,
            color:  colorMap[suit],
        };

        cards.push(card);
    }
}


cards.forEach((card) => {
    let elt = document.createElement("section");
    elt.innerHTML = card.char + card.suit;
    elt.classList.add("card");
    elt.style.color = card.color;
    mainDeck.append(elt);
});