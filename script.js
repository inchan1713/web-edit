let minecraftItems = [];

async function loadMinecraftItems() {
    const url = 'https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/1.21.4/items.json';
    try {
        const response = await fetch(url);
        const data = await response.json();
        minecraftItems = data.map(item => item.name.toUpperCase());
        const dataList = document.getElementById('item-suggestions') || document.createElement('datalist');
        dataList.id = 'item-suggestions';
        document.body.appendChild(dataList);
        document.getElementById('material-id').setAttribute('list', 'item-suggestions');
        dataList.innerHTML = minecraftItems.map(id => `<option value="${id}">`).join('');
    } catch (e) { console.error("データ取得失敗"); }
}

function initInventory() {
    const inventory = document.getElementById('inventory');
    inventory.innerHTML = '';
    for (let i = 0; i < 54; i++) {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        slot.innerHTML = `<span>${i}</span>`;
        slot.addEventListener('click', () => {
            document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
        });
        inventory.appendChild(slot);
    }
}

document.getElementById('save-btn')?.addEventListener('click', () => {
    const materialValue = document.getElementById('material-id').value.toUpperCase().trim();
    const selectedSlot = document.querySelector('.slot.selected');
    if (!selectedSlot) return alert("スロットを選択してください");

    if (minecraftItems.includes(materialValue)) {
        selectedSlot.querySelectorAll('img').forEach(i => i.remove());
        const img = document.createElement('img');
        const lowerId = materialValue.toLowerCase();

        // 1. 特殊アイテムの画像名変換
        let wikiName = materialValue.charAt(0) + lowerId.slice(1); // 先頭だけ大文字
        if (materialValue === 'COMPASS') wikiName = 'Compass_JE3_BE3';
        if (materialValue === 'POTION') wikiName = 'Potion_JE3_BE2';

        // 2. 探しに行くURLのリスト（上から順に試す）
        const urls = [
            `https://mc-heads.net/item/${lowerId}`, // ここが一番ポーション類に強い
            `https://minecraft.wiki/images/${wikiName}.png`, // 公式Wiki
            `https://minecraft-api.vercel.app/images/items/${lowerId}.png`
        ];

        let idx = 0;
        img.src = urls[idx];
        img.onerror = () => {
            idx++;
            if (idx < urls.length) {
                img.src = urls[idx];
            } else {
                img.alt = "無";
                console.log("画像が見つかりませんでした: " + materialValue);
            }
        };

        selectedSlot.appendChild(img);
    } else {
        alert("アイテムIDが無効です");
    }
});

window.addEventListener('DOMContentLoaded', () => {
    initInventory();
    loadMinecraftItems();
});
