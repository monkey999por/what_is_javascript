// Ajax通信は基本的にクロスオリジン（≒別ドメイン）は不可能　※JSONPを使用すれば可能だが、JSONPは通信先でJSONPが実装（提供？）されていることが前提
// 基本時にはオリジン（≒同ドメイン）に対して非同期通信する
document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    document.getElementById('ajax_sample_run').addEventListener('click', () => {
        // javascriptの素の標準的なAjax

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    result.textContent = xhr.responseText;
                } else {
                    result.textContent = 'response error';
                }
            } else {
                result.textContent = 'access...'
            }
        };

        xhr.open('GET', '/restapi.php');
        xhr.send(null);


    }, false);
}, false);



