
function squares(val) {
    for (let i = 1; i < val; i++) {
        //    displayText.innerHTML += 'The square of '+ i +' is :'+(i * i)+ '</p>';
        displayText.innerHTML += `
    <p>
    The square of ${i} is: ${i * i}.
    </p>
    `;
    }
}
goButton.onclick = function(){
    squares(maxNum.value);
}
//squares(maxNum);