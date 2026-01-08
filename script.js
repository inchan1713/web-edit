// 1. 全アイテムIDを保持する変数
let minecraftItems = [];

/**
 * MinecraftのアイテムID一覧を取得する
 */
async function loadMinecraftItems() {
    const materialInput = document.getElementById('material-id');
    if (!materialInput) return;

    const url = 'https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/1.21.4/items.json';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('データ取得失敗');
        const data = await response.json();
        
        minecraftItems = data.map(item => item.name.toUpperCase());

        let dataList = document.getElementById('item-suggestions');
        if (!dataList) {
            dataList = document.createElement('datalist');
            dataList.id = 'item-suggestions';
            document.body.appendChild(dataList);
        }
        
        materialInput.setAttribute('list', 'item-suggestions');
        dataList.innerHTML = minecraftItems.map(id => `<option value="${id}">`).join('');
        
        console.log("✅ アイテム読み込み完了: " + minecraftItems.length + "種類");
    } catch (error) {
        console.error("❌ アイテム読み込みエラー:", error);
    }
}

/**
 * 54スロットを生成
 */
function initInventory() {
    const inventory = document.getElementById('inventory');
    if (!inventory) return;
    inventory.innerHTML = '';

    for (let i = 0; i < 54; i++) {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        slot.dataset.index = i;
        
        // スロット番号を薄く表示（任意）
        const span = document.createElement('span');
        span.style.fontSize = '10px';
        span.style.color = '#555';
        span.innerText = i;
        slot.appendChild(span);

        slot.addEventListener('click', () => {
            document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
            console.log("スロット " + i + " が選択されました");
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
    const selectedSlot = document.querySelector('.slot.selected');

    if (!selectedSlot) {
        alert("編集したいスロットを先にクリックしてください！");
        return;
    }

    if (minecraftItems.includes(materialValue)) {
        // 画像を表示
        let img = selectedSlot.querySelector('img');
        if (!img) {
            img = document.createElement('img');
            selectedSlot.appendChild(img);
        }
        // mc-headsのAPIで画像を表示（小文字にする必要がある）
        img.src = `https://mc-heads.net/item/${materialValue.toLowerCase()}`;
        img.style.width = '32px';
        img.style.height = '32px';
        
        alert("✅ スロット " + selectedSlot.dataset.index + " に保存しました");
    } else {
        alert("⚠️ アイテムIDが正しくありません。");
    }
});
