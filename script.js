const inventory = document.getElementById('inventory');
const matInput = document.getElementById('mat');

// 1. 54個のスロットを生成
for (let i = 0; i < 54; i++) {
    const slot = document.createElement('div');
    slot.classList.add('slot');
    slot.dataset.slot = i;
    
    const img = document.createElement('img');
    img.classList.add('item-icon');
    img.style.display = 'none';
    slot.appendChild(img);

    slot.addEventListener('click', () => {
        document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        
        if (img.dataset.id) {
            matInput.value = img.dataset.id;
        }
    });
    inventory.appendChild(slot);
}

// 2. 入力時の画像更新
matInput.addEventListener('input', (e) => {
    const val = e.target.value.toUpperCase().trim();
    const selected = document.querySelector('.slot.selected');

    if (!selected) return;
    const img = selected.querySelector('img');

    if (val !== "") {
        // 画像を表示
        img.src = `https://minecraft-api.com/api/items/${val.toLowerCase()}/64.png`;
        img.style.display = 'block';
        img.dataset.id = val;
        
        img.onerror = () => { img.style.display = 'none'; };
    } else {
        img.style.display = 'none';
        img.dataset.id = "";
    }
});
