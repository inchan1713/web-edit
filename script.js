const inventory = document.getElementById('inventory');
const matInput = document.getElementById('mat');

// 54個のスロットを生成
for (let i = 0; i < 54; i++) {
    const slot = document.createElement('div');
    slot.classList.add('slot');
    slot.setAttribute('data-slot', i);
    
    // スロット内に画像を表示するための要素を追加
    const img = document.createElement('img');
    img.style.display = 'none'; // 最初は隠しておく
    slot.appendChild(img);

    slot.addEventListener('click', () => {
        document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        
        // 選択したスロットの情報を入力欄に反映（既存のデータがあれば）
        const currentImg = slot.querySelector('img');
        if(currentImg.src) {
            // IDを逆算して入力欄に入れる処理など（後ほど拡張）
        }
    });
    inventory.appendChild(slot);
}

// ID入力時に画像を自動反映
matInput.addEventListener('input', (e) => {
    const id = e.target.value.toUpperCase().trim();
    const selectedSlot = document.querySelector('.slot.selected');

    if (selectedSlot && id !== "") {
        const img = selectedSlot.querySelector('img');
        // Minecraftのアイテム画像を提供しているAPIを利用
        // 小文字にする必要があるため .toLowerCase() を使用
        img.src = `https://minecraft-api.com/api/items/${id.toLowerCase()}/64.png`;
        img.style.display = 'block';
        img.style.width = '32px';
        img.style.height = '32px';
        img.style.imageRendering = 'pixelated'; // ドットをくっきりさせる

        // 画像が読み込めなかった場合（IDが間違っている時）は隠す
        img.onerror = () => { img.style.display = 'none'; };
    }
});
