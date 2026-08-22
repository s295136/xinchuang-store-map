// 主程式初始化與事件監聽
document.addEventListener('DOMContentLoaded', () => {
  // 主題偏好載入
  if (localStorage.theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }

  // 初始拉取資料
  syncWithGoogleSheet();
});

// 全域切換函式
function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.theme = isDark ? 'dark' : 'light';
}

function toggleStyleMode() {
  STATE.currentStyleMode = (STATE.currentStyleMode === 'original') ? 'modern' : 'original';
  document.getElementById('style-mode-label').innerText = (STATE.currentStyleMode === 'original') ? '原始配色' : '現代狀態';
  MapRenderer.renderSVGMap();
}

function setMapMode(mode) {
  STATE.currentMapMode = mode;
  STATE.currentStyleMode = 'modern';
  document.getElementById('style-mode-label').innerText = '現代狀態';

  ['status', 'size', 'type'].forEach(m => {
    const btn = document.getElementById(`btn-mode-${m}`);
    if (btn) {
      btn.className = (m === mode) 
        ? "px-2.5 py-1.5 text-xs font-medium rounded-lg transition bg-indigo-600 text-white shadow-sm"
        : "px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition";
    }
  });

  MapRenderer.renderSVGMap();
}

function openLightbox(src) {
  if (!src) return;
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  if (modal && img) {
    img.src = src;
    modal.classList.remove('hidden');
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.add('hidden');
}

function openHelpModal() { document.getElementById('help-modal').classList.remove('hidden'); }
function closeHelpModal() { document.getElementById('help-modal').classList.add('hidden'); }

function exportToCSV() {
  let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // 加入 UTF-8 BOM 避免 Excel 亂碼
  csvContent += "店面門牌號碼,權狀面積(坪),第一層(坪),第二層(坪),夾層(坪),招商狀態,月租金,租金單價,售價單價,銷售價格,最適業態,臨路位置,預計進駐,空間優勢,配套工程\n";

  STATE.shopsData.forEach(shop => {
    const l = shop.layers || {};
    const statusText = shop.status === 'reserved' ? '洽談/業者評估中' : shop.status === 'rent_sale' ? '可租｜可售' : '可承租';
    csvContent += `"${shop.name}",${shop.area},${l.f1 || 0},${l.f2 || 0},${l.mezzanine || 0},"${statusText}",${shop.price},"${shop.rentUnitStr}","${shop.saleUnitPriceStr}","${shop.salePrice}","${shop.type}","${shop.road}","${shop.tenant}","${shop.desc}","${shop.engineering}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `新創店面招商資產明細_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==========================================
// 全域事件相容橋接 (相容 HTML 原生 inline handlers)
// ==========================================
window.selectShop = (id) => UI.selectShop(id);
window.filterShops = () => UI.filterShops();
window.switchTab = (tab) => UI.switchTab(tab);
