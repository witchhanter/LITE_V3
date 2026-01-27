// для конвентора
let button = document.getElementById("conv");
let input = document.getElementById("input");
let output = document.getElementById("output");
function conv() {
    let x = Number(input.value);
    output.value = x * 9 / 5 + 32;
}
button.addEventListener("click", conv);

// let kst = 0;
// let kstr = 0;
// while(kst !== 8) {
//     while(kstr !== 8) {
//         let square = document.createElement("div");
//         kstr += 1;
//         if(kst % 2 == kstr % 2) {
//             square.style.width = "50px";
//             square.style.backgroundColor = "white";
//         }
//         else {
//             square.style.width = "50px";
//             square.style.backgroundColor = "blue";
//         }
//         let container = document.getElementById("container");
//         container.appendChild(square);
        
//     }
//     kst += 1;
// }

let container = document.getElementById("container");

for(let kst = 0; kst < 8; kst++) {  // строки
    for(let kstr = 0; kstr < 8; kstr++) {  // столбцы
        let square = document.createElement("div");
        
        // Стандартные размеры
        square.style.width = "50px";
        square.style.height = "50px";
        square.style.display = "inline-block";
        
        // Классическая шахматная раскладка
        if ((kst + kstr) % 2 === 0) {
            square.style.backgroundColor = "white";
        } else {
            square.style.backgroundColor = "blue";
        }
        
        container.appendChild(square);
    }
    // Добавляем перенос строки
    container.appendChild(document.createElement("br"));
}