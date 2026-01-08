let minecraftItems = [];

async function loadMinecraftItems() {
    const url = 'https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/1.21.4/items.json';
    try {
        const response = await fetch(url);
        const data = await response.json();
        minecraftItems = data.map(item => item.name.toUpperCase());
        const dataList = document.getElementById('item-suggestions');
        if (dataList) {
            dataList.innerHTML = minecraftItems.map(id => `<option value="${id}">`).join('');
        }
    } catch (e) { console.error("Data Load Error"); }
}

function initInventory() {
    const inventory = document.getElementById('inventory');
    if (!inventory) return;
    inventory.innerHTML = '';
    for (let i = 0; i < 54; i++) {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        slot.innerHTML = `<span>${i}</span>`;
        slot.onclick = () => {
            document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
        };
        inventory.appendChild(slot);
    }
}

document.getElementById('save-btn')?.addEventListener('click', () => {
    const materialValue = document.getElementById('material-id').value.toUpperCase().trim();
    const selectedSlot = document.querySelector('.slot.selected');

    if (!selectedSlot || !materialValue) return;

    selectedSlot.querySelectorAll('img, .no-img').forEach(el => el.remove());

    const lowerId = materialValue.toLowerCase();
    
    // 【デバッグ済】最も表示確率が高いURLセット
    // コンパスやポーションは mc-heads が最強です
    const urls = [
        `https://mc-heads.net/item/${lowerId}`,
        `https://minecraft-api.vercel.app/images/items/${lowerId}.png`,
        `https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/1.21/items/${lowerId}.png`
    ];

    const img = document.createElement('img');
    let attempt = 0;

    const loadImg = (url) => {
        console.log(`Trying: ${url}`);
        img.src = url;
    };

    img.onerror = () => {
        attempt++;
        if (attempt < urls.length) {
            loadImg(urls[attempt]);
        } else {
            const err = document.createElement('div');
            err.className = 'no-img';
            err.innerText = '無';
            err.style.fontSize = '12px';
            selectedSlot.appendChild(err);
        }
    };

    img.onload = () => console.log(`Success: ${materialValue}`);

    selectedSlot.appendChild(img);
    loadImg(urls[0]);
});

window.onload = () => {
    loadMinecraftItems();
    initInventory();
};
