// items.js
// 外部から最新のアイテムリストを取得する専用ファイル
let MC_ITEMS = [];

async function fetchMinecraftItems() {
    try {
        // PrismarineJSが公開している1.21(最新)のデータを取得
        const response = await fetch('https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/1.21/items.json');
        const data = await response.json();
        
        // IDを大文字に変換して配列に格納
        MC_ITEMS = data.map(item => item.name.toUpperCase());
        console.log("アイテムリスト完了:", MC_ITEMS.length, "種類読み込みました");
    } catch (error) {
        console.error("データの取得に失敗しました。予備リストを使用します。");
        MC_ITEMS = ["STONE", "GRASS_BLOCK", "DIRT", "COBBLESTONE", "DIAMOND_SWORD"];
    }
}

// ページ読み込み時に実行
fetchMinecraftItems();