let second = 0;
let timer = document.getElementById('timer');
setInterval(() => {
    second ++;
    timer.innerText = second;
}, 1000);