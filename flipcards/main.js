let suits = ["♠", "♥", "♣", "♦"];

let chars = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


let cards = []
for (let char of chars) {
    for (let suit of suits) {
        let color = "black";

        if (suit === "♥" || suit === "♦") {
            color = "red";
        }

        let card = {
            suit: suit,
            char: char,
            color: color,
        };

        cards.push(card);
    }
}


cards.forEach((cards) => {
    let elt = document.createElement("section");
    elt.innerHTML = card.char + card.suit;
    elt.classList.add("card");
    elt.style.color = card.color;
    mainDeck.append(elt);
});