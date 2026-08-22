const UI = {
  refreshAll() {
    this.recalculateMetrics();
    MapRenderer.renderSVGMap();
    this.populateDatabaseTable();
    this.populateAISelectOptions();
    if (STATE.selectedShopId) this.selectShop(STATE.selectedShopId);
  },

  setSyncState(state, count = 0) {
    const badge = document.getElementById('header-sync-badge');
    const msg = document.getElementById('sheet-sync-status-msg');
    const light = document.getElementById('sheet-sync-light');

    if (state === 'loading') {
      badge.className = "flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950/20 dark:text-amber-400";
      badge.innerHTML = `<i class="fa-solid fa-arrows-rotate animate-spin"></i> 同步中...`;
      if (light) light.className = "w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse";
      if (msg) msg.innerText = "正在向雲端試算表拉取即時數據...";
    } else if (state === 'success') {
      const now = new Date().toLocaleTimeString();
      badge.className = "flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400";
      badge.innerHTML = `<i class="fa-solid fa-circle-check"></i> 🟢 雲端同步成功`;
      if (light) light.className = "w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse";
      if (msg) msg.innerText = `已於 ${now} 成功連動 ${count} 筆門牌資料。`;
    } else {
      badge.className = "flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-50 text-orange-600 border border-orange-200";
      badge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> 離線模式`;
      if (light) light.className = "w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse";
      if (msg) msg.innerText = `⚠️ 雲端連線失敗，已載入內建高精度備用資料。`;
    }
  },

  recalculateMetrics() {
    const totalArea = STATE.shopsData.reduce((acc, s) => acc + s.area, 0);
    const leasedCount = STATE.shopsData.filter(s => s.status === 'leased').length;
    const leasedRate = STATE.shopsData.length ? ((leasedCount / STATE.shopsData.length) * 100).toFixed(1) : 0;

    document.getElementById('metric-total-count').innerText = STATE.shopsData.length;
    document.getElementById('metric-total-area').innerText = totalArea.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('metric-leased-rate').innerText = `${leasedRate}%`;
  },

  selectShop(id) {
    STATE.selectedShopId = id;
    MapRenderer.renderSVGMap();

    const shop = STATE.shopsData.find(s => s.id === id);
    if (!shop) return;

    document.getElementById('no-selection-state').classList.add('hidden');
    document.getElementById('detail-state').classList.remove('hidden');

    document.getElementById('detail-title').innerText = shop.name;
    document.getElementById('detail-area').innerHTML = `${shop.area} <span class="text-lg font-normal font-sans text-slate-500">坪</span>`;
    document.getElementById('detail-area-m2').innerText = `${(shop.area * 3.3058).toFixed(1)} 平方公尺`;
    document.getElementById('detail-total-sale-price').innerText = shop.salePrice || "面議";
    
    document.getElementById('detail-rent').innerText = shop.price > 0 ? `NT$ ${shop.price.toLocaleString()}` : '洽談中 / 地主戶';
    document.getElementById('detail-rent-unit').innerText = shop.rentUnitStr && shop.rentUnitStr !== "-" ? `約 ${shop.rentUnitStr}` : '意者面議';

    document.getElementById('detail-type-badge').innerText = shop.type ? `最適業態：${shop.type}` : "";
    document.getElementById('detail-industry').innerHTML = shop.type 
      ? `<i class="fa-solid fa-shop text-indigo-500"></i> ${shop.type}`
      : `<span class="text-slate-400 font-normal">（未填寫）</span>`;

    document.getElementById('detail-tenant').innerText = shop.tenant || "目前無填寫 / 開放接洽";
    document.getElementById('detail-unit-price').innerText = shop.saleUnitPriceStr && shop.saleUnitPriceStr !== "-" ? shop.saleUnitPriceStr : '面議';
    document.getElementById('detail-desc').innerText = shop.desc || "無說明資料。";
    document.getElementById('detail-engineering').innerText = shop.engineering || "無工程規格說明。";

    this.renderFloorPlanAndLayers(shop);

    const badge = document.getElementById('detail-badge');
    badge.className = "px-2.5 py-0.5 text-xs font-bold rounded-full " + (
      shop.status === 'reserved' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300' :
      shop.status === 'rent_sale' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300' :
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
    );
    badge.innerText = shop.status === 'reserved' ? '洽談/業者評估中 (Reserved)' : shop.status === 'rent_sale' ? '可租｜可售' : '可承租 (Available)';

    const aiShopSelect = document.getElementById('ai-shop-select');
    if (aiShopSelect) aiShopSelect.value = id;
    
    this.updateBuildingPlanImage(shop.name);
  },

  updateBuildingPlanImage(shopName) {
    const img = document.getElementById('building-plan-img');
    const fallback = document.getElementById('building-plan-fallback');
    const title = document.getElementById('building-plan-title');

    if (title) title.innerText = shopName;
    if (img && fallback) {
      img.src = `pic/${shopName}.png`;
      img.classList.remove('hidden');
      fallback.classList.add('hidden');
      img.onerror = () => {
        img.classList.add('hidden');
        fallback.classList.remove('hidden');
      };
    }
  },

  renderFloorPlanAndLayers(shop) {
    const container = document.getElementById('floorplan-svg-container');
    const list = document.getElementById('floorplan-breakdown-list');
    const layers = shop.layers || { f1: 0, f2: 0, mezzanine: 0, roof: 0, balcony: 0 };

    let svg = `<svg viewBox="0 0 220 100" class="w-full h-full"><rect x="5" y="5" width="210" height="90" fill="none" stroke="#64748b" stroke-width="1.5" rx="4"/>`;
    if (layers.f2 > 0) {
      svg += `
        <rect x="20" y="20" width="80" height="60" fill="#6366f1" fill-opacity="0.15" stroke="#6366f1" stroke-width="1.5" rx="2"/>
        <text x="60" y="55" fill="#6366f1" font-size="10" font-weight="bold" text-anchor="middle">第二層</text>
        <rect x="110" y="20" width="90" height="60" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1.5" rx="2"/>
        <text x="155" y="55" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">第一層</text>`;
    } else {
      svg += `
        <rect x="20" y="20" width="130" height="60" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1.5" rx="2"/>
        <text x="85" y="55" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">第一層 (挑高)</text>
        <rect x="155" y="20" width="45" height="35" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1" stroke-dasharray="2 2" rx="2"/>
        <text x="177" y="40" fill="#f59e0b" font-size="8" font-weight="bold" text-anchor="middle">夾層</text>`;
    }
    svg += `</svg>`;
    container.innerHTML = svg;

    const layerItems = [
      { key: 'f1', label: '第一層', color: 'bg-emerald-500' },
      { key: 'f2', label: '第二層', color: 'bg-indigo-500' },
      { key: 'mezzanine', label: '第一層夾層', color: 'bg-amber-500' },
      { key: 'roof', label: '屋頂突出物', color: 'bg-slate-400' },
      { key: 'balcony', label: '陽台', color: 'bg-teal-400' }
    ];

    list.innerHTML = layerItems
      .filter(item => layers[item.key] > 0)
      .map(item => `
        <div class="flex justify-between items-center text-xs pb-1 border-b border-slate-100 dark:border-slate-800">
          <span class="text-slate-500 flex items-center gap-1.5"><span class="w-2 h-2 rounded-full ${item.color}"></span> ${item.label}</span>
          <span class="font-mono font-bold text-slate-900 dark:text-white text-sm">${layers[item.key]} <span class="text-[10px] font-normal text-slate-400">坪</span></span>
        </div>
      `).join('');
  },

  populateDatabaseTable() {
    const tbody = document.getElementById('db-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    STATE.shopsData.forEach(shop => {
      const statusBadge = shop.status === 'reserved' 
        ? `<span class="bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-100 dark:border-amber-900 px-1.5 py-0.5 rounded font-bold">洽談/評估中</span>`
        : shop.status === 'rent_sale'
          ? `<span class="bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-100 dark:border-blue-900 px-1.5 py-0.5 rounded font-bold">可租｜可售</span>`
          : `<span class="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900 px-1.5 py-0.5 rounded font-bold">可承租</span>`;

      const row = document.createElement('tr');
      row.className = "hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer";
      row.onclick = () => { UI.switchTab('profile'); UI.selectShop(shop.id); };

      const displayType = shop.tenant 
        ? `<span class="font-semibold text-slate-900 dark:text-white">${shop.type || '未指定'}</span><br><span class="text-[10px] text-emerald-600 dark:text-emerald-400">👤 ${shop.tenant}</span>`
        : `<span class="font-medium text-slate-500">${shop.type || '-'}</span>`;

      row.innerHTML = `
        <td class="p-3 font-bold text-slate-900 dark:text-white">${shop.name}</td>
        <td class="p-3 font-mono font-bold">${shop.area} 坪</td>
        <td class="p-3">${statusBadge}</td>
        <td class="p-3 font-mono text-indigo-600 dark:text-indigo-400">${shop.price > 0 ? `NT$ ${shop.price.toLocaleString()}` : '<span class="text-slate-400">面議</span>'}</td>
        <td class="p-3">${displayType}</td>
      `;
      tbody.appendChild(row);
    });
  },

  populateAISelectOptions() {
    const select = document.getElementById('ai-shop-select');
    if (!select) return;
    select.innerHTML = STATE.shopsData.map(s => `
      <option value="${s.id}">${s.name} (${s.area}坪${s.type ? ' - ' + s.type : ''})</option>
    `).join('');
  },

  switchTab(tab) {
    STATE.activeTab = tab;
    ['profile', 'ai-suite', 'database'].forEach(t => {
      const btn = document.getElementById(`tab-btn-${t}`);
      const view = document.getElementById(`tab-${t}`);
      if (!btn || !view) return;
      if (t === tab) {
        btn.classList.add('border-indigo-600', 'text-indigo-600', 'dark:text-indigo-400', 'bg-white', 'dark:bg-slate-900');
        btn.classList.remove('border-transparent', 'text-slate-500', 'dark:text-slate-400');
        view.classList.remove('hidden');
      } else {
        btn.classList.remove('border-indigo-600', 'text-indigo-600', 'dark:text-indigo-400', 'bg-white', 'dark:bg-slate-900');
        btn.classList.add('border-transparent', 'text-slate-500', 'dark:text-slate-400');
        view.classList.add('hidden');
      }
    });
  },

  filterShops() {
    const query = document.getElementById('shop-search').value.toLowerCase().trim();
    const status = document.getElementById('status-filter').value;
    
    const filtered = STATE.shopsData.filter(s => {
      const matchesQuery = s.name.includes(query) || s.type.includes(query) || (s.tenant && s.tenant.toLowerCase().includes(query));
      const matchesStatus = status === 'all' || s.status === status;
      return matchesQuery && matchesStatus;
    });

    document.querySelectorAll('[id^="svg-shop-"]').forEach(el => {
      const shopId = el.id.replace('svg-shop-', '');
      const isMatched = filtered.some(s => s.id === shopId);
      el.style.opacity = isMatched ? '1' : '0.15';
      el.style.pointerEvents = isMatched ? 'auto' : 'none';
    });
  },

  showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold opacity-0 translate-y-2 transition-all duration-300";
    toast.innerHTML = message;
    container.appendChild(toast);
    setTimeout(() => toast.classList.remove('opacity-0', 'translate-y-2'), 50);
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => container.removeChild(toast), 300);
    }, 3500);
  }
};