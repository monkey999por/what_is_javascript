
// ちょっと特殊 handleEventをもったオブジェクトでイベント設定
document.addEventListener('DOMContentLoaded', () => {
    const data = {
        title: 'title desuyo',
        desc : 'unko man',
        handleEvent: function(){
            console.log(`title : ${this.title}, desc: ${this.desc}`);
        },
    }

    // handleEventをもっているオブジェクトの場合、リスナにはそのオブジェクトを指定すればよい
    document.getElementById('handle_event').addEventListener('click', data, false);

})
// TODO: thisの扱いについて記載する。
// event babbling test
document.addEventListener('DOMContentLoaded', () => {
    const outer = document.getElementById('event_babbling_outer');
    const inner = document.getElementById('event_babbling_inner');
    const button = document.getElementById('event_babbling_button');

    const eventInfo = (event) => {
        console.log(`  ${event.currentTarget.id}`);
        console.log(`  event.bubbles : ${event.bubbles}`);
        console.log(`  event.eventPhase: ${event.eventPhase}`);
        console.log(`  event.currentTarget: ${event.currentTarget}`);
    }
    // 1.first run
    button.onclick = (e) => {
        console.log('button click');
        eventInfo(e);
    }

    // 2.second run
    inner.onclick = (e) => {
        console.log('inner run event');
        eventInfo(e);
        // cancel event bubbling
        // e.stopPropagation();
    }

    //3.third run
    outer.onclick = (e) => {
        console.log('outer run event');
        eventInfo(e);
    }


})

// イベント削除だったりのテスト、ハンドラーとリスナー
document.addEventListener('DOMContentLoaded', () => {
    let event_button = document.getElementById('event_test');
    // [1]
    //event_button.onclick = listener;

    // [2]
    event_button.addEventListener('click', listener, false);

}, false);

// remove event handler
function removeEvent() {
    let event_button = document.getElementById('event_test');

    // それぞれ対応した方じゃないと上手く消せないっぽい
    // [1]
    // event_button.onclick = null;

    // [2]
    event_button.removeEventListener('click', listener, false);
}

const listener = function () {
    alert('event a');
}




// 要素変更,スタイル変更
// classListとか使ったり
document.addEventListener('DOMContentLoaded', addList('DOMContentLoaded'), false);

document.getElementById('addbutton').addEventListener('click', addList);
document.getElementById('in').addEventListener('keypress', addWithEnter);
function addWithEnter(event) {
    console.log(event.keyCode);
    if (event.keyCode === 13) addList();
}

function addList() {
    // let li = document.getElementsByTagName('li');
    let lia = document.getElementById('list');
    // let newUl = li.appendChild(document.createElement('ul'));
    let newUl = document.createElement('ul');
    newUl.setAttribute('class', 'created');
    const input = document.getElementById('in')
    const value = input.value
    newUl.innerText = value == null || value == undefined ? "default" : value;
    lia.append(newUl);
    input.value = "";
    // console.log(li);
    console.log(lia);
}


// 関数の定義方法でthisの意味が変わるから注意だよ
document.addEventListener('DOMContentLoaded', () => {
    let input_zone = document.getElementById('inputs');
    input_zone.addEventListener('click', function () {
        console.log(this); // input_zoneが取れる
        this.classList.toggle('black');
    }, false);
}, false);

document.addEventListener('DOMContentLoaded', () => {
    let input_zone = document.getElementById('inputs');
    input_zone.addEventListener('mouseover', () => {
        // console.log(this); // Windowがとれる　windowってなに・・
    }, false);
}, false);