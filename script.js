let minecraftItems = [];
const SPRITE_WIDTH = 32; // 1枚の画像に横32個並んでいる

async function initApp() {
    const input = document.getElementById('material-id');
    const dl = document.getElementById('item-suggestions');
    
    try {
        const res = await fetch('https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/1.21.4/items.json');
        const data = await res.json();
        minecraftItems = data;

        // 予測変換の構築
        dl.innerHTML = data.map(item => `<option value="${item.name.toUpperCase()}">`).join('');
        console.log("✅ アイテムデータ読み込み完了: " + data.length + "種類");
    } catch (e) { console.error("データ取得失敗"); }

    // インベントリ生成
    const grid = document.getElementById('inventory');
    grid.innerHTML = '';
    for (let i = 0; i < 54; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.innerHTML = `<span>${i}</span>`;
        slot.onclick = () => {
            document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
        };
        grid.appendChild(slot);
    }
}

document.getElementById('save-btn')?.addEventListener('click', () => {
    const val = document.getElementById('material-id').value.toUpperCase().trim();
    const slot = document.querySelector('.slot.selected');

    if (!slot) return alert("スロットを選択してください");
    
    // アイテムを探してスプライト座標を取得
    const item = minecraftItems.find(i => i.name.toUpperCase() === val);
    if (!item) return alert("無効なアイテムIDです");

    slot.querySelectorAll('.item-icon').forEach(el => el.remove());

    // 座標計算 (ID番号を元に位置を特定)
    const iconId = item.id;
    const x = (iconId % SPRITE_WIDTH) * 32;
    const y = Math.floor(iconId / SPRITE_WIDTH) * 32;

    const icon = document.createElement('div');
    icon.className = 'item-icon';
    icon.style.backgroundPosition = `-${x}px -${y}px`;
    
    slot.appendChild(icon);
    console.log(`スロットに ${val} (ID:${iconId}) を配置しました`);
});

document.addEventListener('DOMContentLoaded', initApp);
