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
        console.log("✅ アイテム読み込み完了: " + minecraftItems.length);
    } catch (e) { console.error("データ取得失敗", e); }
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

        // 解決策：高画質なWiki画像とAPIを組み合わせる
        const urls = [
            `https://mc-heads.net/item/${lowerId}`, // コンパス、ポーション、ブロックすべてに強い
            `https://minecraft-api.vercel.app/images/items/${lowerId}.png`,
            `https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/1.21/items/${lowerId}.png`
        ];

        let idx = 0;
        img.src = urls[idx];
        img.onerror = () => {
            idx++;
            if (idx < urls.length) img.src = urls[idx];
            else {
                console.warn("画像が見つかりません: " + lowerId);
                img.alt = "❌";
            }
        };

        selectedSlot.appendChild(img);
        console.log(`スロットに ${materialValue} を配置しました`);
    } else {
        alert("アイテムIDが無効です。候補から選択してください。");
    }
});

window.addEventListener('DOMContentLoaded', () => {
    initInventory();
    loadMinecraftItems();
});
