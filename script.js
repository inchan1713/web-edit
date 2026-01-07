const grid = document.getElementById('inventory');

// 54マスのインベントリを生成
for (let i = 0; i < 54; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot';
    grid.appendChild(slot);
}