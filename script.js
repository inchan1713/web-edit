// アイテムデータの保持用
let minecraftItems = [];

// ページ読み込み時にAPIからアイテムデータを取得
async function fetchMinecraftItems() {
    const materialInput = document.getElementById('material-id'); // あなたのHTMLのIDに合わせました
    if (!materialInput) return;

    try {
        // PrismarineJSのデータ（最新の1.21）を使用
        const response = await fetch('https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/1.21/items.json');
        const data = await response.json();
        
        // アイテム名（ID）のリストを作成
        minecraftItems = data.map(item => item.name.toUpperCase());

        // HTMLにdatalist（入力候補の箱）を作成して紐付け
        let dataList = document.getElementById('item-list-suggestions');
        if (!dataList) {
            dataList = document.createElement('datalist');
            dataList.id = 'item-list-suggestions';
            document.body.appendChild(dataList);
        }
        
        // 入力欄に候補リストを紐付ける
        materialInput.setAttribute('list', 'item-list-suggestions');

        // datalistの中に全アイテムを流し込む
        dataList.innerHTML = minecraftItems.map(id => `<option value="${id}">`).join('');
        
        console.log("アイテムリストを読み込みました:", minecraftItems.length, "種類");
    } catch (error) {
        console.error("アイテムデータの取得に失敗しました:", error);
    }
}

// ページを読み込んだら実行
window.addEventListener('DOMContentLoaded', fetchMinecraftItems);

// --- 以下、既存のロジック用（必要に応じて調整） ---

// スロットに保存するボタンの動作
document.getElementById('save-item')?.addEventListener('click', () => {
    const materialValue = document.getElementById('material-id').value.toUpperCase();
    
    if (minecraftItems.length > 0 && !minecraftItems.includes(materialValue)) {
        alert("警告: '" + materialValue + "' は正しいアイテムIDではない可能性があります。");
    } else {
        alert("スロットに保存しました！: " + materialValue);
    }
});
