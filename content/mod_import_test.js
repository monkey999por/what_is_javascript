import { aab, testexp } from "./module/mod_export_test.js";

console.log('module import');

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mod_test').addEventListener('click', (ev) => {
        console.log('module test');
        testexp({ val: 'aaa', desc: 'hello' });
        console.log(aab);
    },false)
}, false);


