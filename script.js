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
    } catch (e) { console.error("データ読み込み失敗"); }
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
    if (!minecraftItems.includes(materialValue)) return alert("無効なアイテムIDです");

    selectedSlot.querySelectorAll('img, .no-img').forEach(el => el.remove());

    const lowerId = materialValue.toLowerCase();
    const img = document.createElement('img');

    // ★最強の画像パスリスト：上から順に試す
    const urls = [
        // 1. Minecraft Wiki 形式（コンパスやポーションに一番強い）
        `https://minecraft.wiki/images/Invicon_${materialValue}.png`,
        // 2. MC-Heads (動的生成なのでポーションの色に強い)
        `https://mc-heads.net/item/${lowerId}`,
        // 3. PrismarineJS (最新アイテムに強い)
        `https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/1.21/items/${lowerId}.png`
    ];

    let idx = 0;
    const tryNext = () => {
        if (idx < urls.length) {
            img.src = urls[idx];
            idx++;
        } else {
            const noImg = document.createElement('div');
            noImg.className = 'no-img';
            noImg.innerText = '無';
            noImg.style.fontSize = '10px';
            selectedSlot.appendChild(noImg);
        }
    };

    img.onerror = tryNext;
    selectedSlot.appendChild(img);
    tryNext();
});

window.addEventListener('DOMContentLoaded', () => {
    initInventory();
    loadMinecraftItems();
});
