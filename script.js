const inventory = document.getElementById('inventory');
const matInput = document.getElementById('mat');

// 54個のスロットを生成
for (let i = 0; i < 54; i++) {
    const slot = document.createElement('div');
    slot.classList.add('slot');
    slot.dataset.slot = i;
    
    // スロット内に画像用の器をあらかじめ作っておく
    const img = document.createElement('img');
    img.style.display = 'none';
    img.classList.add('item-icon');
    slot.appendChild(img);

    slot.addEventListener('click', () => {
        document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        
        // 選択時にすでに画像があれば、そのIDを右の入力欄に反映
        if (img.dataset.id) {
            matInput.value = img.dataset.id;
        }
    });
    inventory.appendChild(slot);
}

// マテリアルID入力時のリアルタイム反映
matInput.addEventListener('input', (e) => {
    const val = e.target.value.toUpperCase().trim();
    const selected = document.querySelector('.slot.selected');
    
    if (!selected) return;
    const img = selected.querySelector('img');

    if (val !== "") {
        // 画像APIを表示
        img.src = `https://minecraft-api.com/api/items/${val.toLowerCase()}/64.png`;
        img.style.display = 'block';
        img.dataset.id = val;
        
        // 画像が存在しないIDの場合は非表示にする
        img.onerror = () => { img.style.display = 'none'; };
    } else {
        img.style.display = 'none';
        img.dataset.id = "";
    }
});
