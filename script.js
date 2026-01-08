// script.js
const inventory = document.getElementById('inventory');
const matInput = document.getElementById('mat'); // マテリアルID入力欄

// 1. インベントリのスロット（54個）を生成
for (let i = 0; i < 54; i++) {
    const slot = document.createElement('div');
    slot.classList.add('slot');
    slot.dataset.slot = i;
    
    slot.addEventListener('click', () => {
        // 全スロットから選択解除し、クリックしたスロットを選択
        document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        
        // すでに画像がある場合は、そのIDを入力欄に反映させる（利便性のため）
        const img = slot.querySelector('img');
        if (img && img.dataset.id) {
            matInput.value = img.dataset.id;
        }
    });
    inventory.appendChild(slot);
}

// 2. マテリアルID入力時の画像表示処理
matInput.addEventListener('input', (e) => {
    const inputId = e.target.value.toUpperCase().trim();
    const selectedSlot = document.querySelector('.slot.selected');

    if (!selectedSlot) return;

    // スロット内に img 要素がなければ作成
    let img = selectedSlot.querySelector('img');
    if (!img) {
        img = document.createElement('img');
        selectedSlot.appendChild(img);
    }

    if (inputId !== "") {
        // 画像URLをセット (小文字にする必要がある)
        img.src = `https://minecraft-api.com/api/items/${inputId.toLowerCase()}/64.png`;
        img.style.display = 'block';
        img.style.width = '32px';
        img.style.height = '32px';
        img.style.imageRendering = 'pixelated';
        img.dataset.id = inputId; // IDをデータ属性に保存

        // 画像が存在しない（IDミス）ときは隠す
        img.onerror = () => { img.style.display = 'none'; };
    } else {
        img.style.display = 'none';
        img.dataset.id = "";
    }
});
