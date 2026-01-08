// 1. 全アイテムIDを保持する変数
let minecraftItems = [];

/**
 * MinecraftのアイテムID一覧を取得する
 * 1.21.4のデータURLに修正しました
 */
async function loadMinecraftItems() {
    const materialInput = document.getElementById('material-id');
    if (!materialInput) return;

    // 正しいURLに修正 (1.21 -> 1.21.4)
    const url = 'https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/1.21.4/items.json';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('データが見つかりませんでした(404)');
        
        const data = await response.json();
        
        // アイテムIDを抽出して大文字に変換
        minecraftItems = data.map(item => item.name.toUpperCase());

        // 候補を表示するためのdatalistを作成
        let dataList = document.getElementById('item-suggestions');
        if (!dataList) {
            dataList = document.createElement('datalist');
            dataList.id = 'item-suggestions';
            document.body.appendChild(dataList);
        }
        
        // 入力欄に紐付け
        materialInput.setAttribute('list', 'item-suggestions');
        dataList.innerHTML = minecraftItems.map(id => `<option value="${id}">`).join('');
        
        console.log("✅ アイテム読み込み完了: " + minecraftItems.length + "種類");
    } catch (error) {
        console.error("❌ アイテムデータの取得に失敗しました:", error);
        // 失敗した時のための最低限のバックアップ
        minecraftItems = ["DIAMOND", "IRON_INGOT", "DIRT", "STONE", "CHEST"];
    }
}

/**
 * チェストの54スロットを画面に作る
 */
function initInventory() {
    const inventory = document.getElementById('inventory');
    if (!inventory) return;
    inventory.innerHTML = ''; // 既存の中身をクリア

    for (let i = 0; i < 54; i++) {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        slot.dataset.index = i;
        slot.addEventListener('click', () => {
            console.log("スロット " + i + " が選択されました");
            // 全スロットから選択状態を解除
            document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
            // クリックしたスロットを選択状態に
            slot.classList.add('selected');
        });
        inventory.appendChild(slot);
    }
}

// ページ読み込み時に実行
window.addEventListener('DOMContentLoaded', () => {
    initInventory();
    loadMinecraftItems();
});

// 保存ボタンの動作
document.getElementById('save-btn')?.addEventListener('click', () => {
    const materialValue = document.getElementById('material-id').value.toUpperCase();
    
    if (minecraftItems.length > 0 && !minecraftItems.includes(materialValue)) {
        alert("⚠️ アイテムID '" + materialValue + "' が見つかりません。\n正しいIDを入力してください。");
    } else {
        alert("✅ スロットに保存しました: " + materialValue);
    }
});
