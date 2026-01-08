let MC_ITEMS = [];

async function fetchMinecraftItems() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/1.21/items.json');
        const data = await response.json();
        MC_ITEMS = data.map(item => item.name.toUpperCase());
        console.log("アイテムリスト完了:", MC_ITEMS.length);
    } catch (error) {
        console.error("取得失敗");
        MC_ITEMS = ["STONE", "DIAMOND_SWORD", "APPLE"];
    }
}

fetchMinecraftItems();
