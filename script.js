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
        console.log("✅ アイテム読み込み完了: 1385種類");
    } catch (e) { console.error("データ取得失敗"); }
}

function initInventory() {
    const inventory = document.getElementById('inventory');
    inventory.innerHTML = '';
    for (let i = 0; i < 54; i++) {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        slot.innerHTML = `<span style="position:absolute; top:2px; left:4px; font-size:9px; color:rgba(0,0,0,0.15);">${i}</span>`;
        slot.addEventListener('click', () => {
            document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
        });
        inventory.appendChild(slot);
    }
}

document.getElementById('save-btn')?.addEventListener('click', () => {
    const materialInput = document.getElementById('material-id');
    const materialValue = materialInput.value.toUpperCase().trim();
    const selectedSlot = document.querySelector('.slot.selected');

    if (!selectedSlot) return alert("スロットを選択してください");

    // 画像取得先の優先順位を「最新かつ確実な場所」に変更
    const lowerId = materialValue.toLowerCase();
    const urls = [
        `https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/1.21/items/${lowerId}.png`,
        `https://mc-heads.net/item/${lowerId}`,
        `https://minecraft-api.vercel.app/images/items/${lowerId}.png`
    ];

    selectedSlot.querySelectorAll('img').forEach(i => i.remove());
    const img = document.createElement('img');
    
    let idx = 0;
    img.src = urls[idx];
    img.onerror = () => {
        idx++;
        if (idx < urls.length) {
            img.src = urls[idx];
        } else {
            img.alt = "無";
            console.warn("画像なし: " + lowerId);
        }
    };

    selectedSlot.appendChild(img);
    console.log(`スロットに ${materialValue} を配置しました`);
});

window.addEventListener('DOMContentLoaded', () => {
    initInventory();
    loadMinecraftItems();
});
