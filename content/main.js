function runMain(event) {
    da() // 5; 5;
    da(10) // 
    da(1,2)
}
function da(param = 5, nextParam = param){
    console.log(param); // 5
    console.log(nextParam); // 5
}

