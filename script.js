let minecraftItems = [];

// 1. アイテムデータの読み込み
async function loadMinecraftItems() {
    const materialInput = document.getElementById('material-id');
    if (!materialInput) return;

    // 最新のアイテムリストを取得
    const url = 'https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/1.21.4/items.json';

    try {
        const response = await fetch(url);
        const data = await response.json();
        minecraftItems = data.map(item => item.name.toUpperCase());

        let dataList = document.getElementById('item-suggestions') || document.createElement('datalist');
        dataList.id = 'item-suggestions';
        document.body.appendChild(dataList);
        
        materialInput.setAttribute('list', 'item-suggestions');
        dataList.innerHTML = minecraftItems.map(id => `<option value="${id}">`).join('');
        console.log("✅ アイテム読み込み完了: " + minecraftItems.length + "種類");
    } catch (e) {
        console.error("読み込み失敗", e);
    }
}

// 2. 54スロットを生成
function initInventory() {
    const inventory = document.getElementById('inventory');
    if (!inventory) return;
    inventory.innerHTML = '';

    for (let i = 0; i < 54; i++) {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        slot.dataset.index = i;
        slot.innerHTML = `<span>${i}</span>`;
        
        slot.addEventListener('click', () => {
            document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
            console.log(`スロット ${i} が選択されました`);
        });
        inventory.appendChild(slot);
    }
}

// 3. 保存ボタン：画像取得の強化版
document.getElementById('save-btn')?.addEventListener('click', () => {
    const materialInput = document.getElementById('material-id');
    const materialValue = materialInput.value.toUpperCase().trim();
    const selectedSlot = document.querySelector('.slot.selected');

    if (!selectedSlot) {
        alert("スロットを選択してください");
        return;
    }

    if (minecraftItems.includes(materialValue)) {
        const oldImg = selectedSlot.querySelector('img');
        if (oldImg) oldImg.remove();

        const img = document.createElement('img');
        const lowerId = materialValue.toLowerCase();

        // 画像取得URLリスト（上から順に試す）
        const getUrls = (id) => [
            `https://minecraft-api.vercel.app/images/items/${id}.png`,
            `https://mc-heads.net/item/${id}`,
            `https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/1.21/items/${id}.png`
        ];

        let urls = getUrls(lowerId);
        
        // 特殊なアイテム名の補正
        if(lowerId === 'compass') urls.unshift('https://minecraft.wiki/images/Compass_JE3_BE3.png');
        if(lowerId === 'potion') urls.unshift('https://minecraft.wiki/images/ archive/Potion_JE3_BE2.png');

        let currentUrlIndex = 0;
        img.src = urls[currentUrlIndex];

        img.onerror = () => {
            currentUrlIndex++;
            if (currentUrlIndex < urls.length) {
                img.src = urls[currentUrlIndex];
            } else {
                // 全て失敗した時の最終手段：文字を表示
                console.warn(`画像が見つかりません: ${lowerId}`);
                img.alt = "無";
            }
        };

        selectedSlot.appendChild(img);
        console.log(`スロット ${selectedSlot.dataset.index} に ${materialValue} を配置しました`);
    } else {
        alert("無効なアイテムIDです。スペルを確認してください。");
    }
});

window.addEventListener('DOMContentLoaded', () => {
    initInventory();
    loadMinecraftItems();
});
