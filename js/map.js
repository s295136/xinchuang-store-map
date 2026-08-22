const MapRenderer = {
  renderSVGMap() {
    const container = document.getElementById('svg-map-wrapper');
    if (!container) return;

    let svgHtml = `
    <svg class="w-full h-full" viewBox="0 0 940 640" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148,163,184,0.1)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="940" height="640" fill="url(#grid)" opacity="0.5"/>

      <!-- 臨路標示 -->
      <g opacity="0.85" class="transition-opacity hover:opacity-100">
        <polygon points="100,240 870,70 870,30 100,200" fill="#334155" class="dark:fill-slate-800"/>
        <text x="485" y="145" fill="#ffffff" font-size="12" font-weight="900" letter-spacing="12" transform="rotate(-12.6 485 145)" text-anchor="middle">福慧路</text>
      </g>
      <g opacity="0.75" class="transition-opacity hover:opacity-100">
        <polygon points="10,260 80,260 80,590 10,590" fill="#334155" class="dark:fill-slate-800"/>
        <text x="45" y="425" fill="#ffffff" font-size="12" font-weight="900" letter-spacing="8" transform="rotate(90 45 425)" text-anchor="middle">新知十路</text>
      </g>
      <g opacity="0.75" class="transition-opacity hover:opacity-100">
        <rect x="890" y="50" width="40" height="540" fill="#334155" rx="4" class="dark:fill-slate-800"/>
        <text x="910" y="320" fill="#ffffff" font-size="12" font-weight="900" letter-spacing="8" transform="rotate(90 910 320)" text-anchor="middle">新知八路</text>
      </g>
      <g opacity="0.75" class="transition-opacity hover:opacity-100">
        <rect x="180" y="600" width="690" height="25" fill="#334155" rx="4" class="dark:fill-slate-800"/>
        <text x="525" y="617" fill="#ffffff" font-size="11" font-weight="900" letter-spacing="6" text-anchor="middle">南側道路 (199號段)</text>
      </g>
      <polygon points="90,265 875,85 875,590 90,590" fill="none" stroke="rgba(148,163,184,0.3)" stroke-width="2" stroke-dasharray="4 4"/>
    `;

    STATE.shopsData.forEach(shop => {
      const points = CONFIG.coordMap[shop.id] || "0,0 50,0 50,50 0,50";
      const color = this.getShopColor(shop);
      const strokeColor = this.getShopStrokeColor(shop);
      const center = this.getPolygonCenter(points);
      const isSelected = STATE.selectedShopId === shop.id;
      const labelName = shop.name.match(/\d+號/) ? shop.name.match(/\d+號/)[0] : shop.name;

      svgHtml += `
        <g id="svg-shop-${shop.id}" onclick="UI.selectShop('${shop.id}')" class="cursor-pointer group transition-all duration-300">
          <polygon 
            points="${points}" 
            fill="${color}"
            stroke="${isSelected ? '#10b981' : strokeColor}" 
            stroke-width="${isSelected ? '3.5' : '1.5'}"
            class="transition-all duration-200 group-hover:opacity-90 ${isSelected ? 'selected-glow' : ''}"
          />
          <text x="${center.x}" y="${center.y - 4}" fill="${isSelected ? '#10b981' : '#0f172a'}" class="dark:fill-slate-900 font-black text-[12px] text-center" text-anchor="middle">
            ${labelName}
          </text>
          <text x="${center.x}" y="${center.y + 11}" fill="${isSelected ? '#10b981' : '#475569'}" class="dark:fill-slate-800 font-mono text-[9px] font-bold text-center" text-anchor="middle">
            ${shop.area}坪
          </text>
        </g>
      `;
    });

    svgHtml += `</svg>`;
    container.innerHTML = svgHtml;
  },

  getPolygonCenter(pointsStr) {
    const pts = pointsStr.split(' ').map(p => {
      const [x, y] = p.split(',').map(Number);
      return { x, y };
    });
    const sum = pts.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
    return { x: sum.x / pts.length, y: sum.y / pts.length };
  },

  getShopColor(shop) {
    if (STATE.currentStyleMode === 'original') {
      switch (shop.originColor) {
        case 'cyan': return '#ccfbf1';   
        case 'yellow': return '#fef3c7'; 
        case 'grey': return '#f1f5f9';   
        default: return '#ffffff';       
      }
    }

    if (STATE.currentMapMode === 'status') {
      switch (shop.status) {
        case 'reserved': return '#fef3c7';   
        case 'rent_sale': return '#e0f2fe';  
        case 'available': return '#d1fae5';  
        default: return '#f1f5f9';
      }
    } else if (STATE.currentMapMode === 'size') {
      if (shop.area > 110) return '#fed7aa'; 
      if (shop.area >= 90) return '#fde047';  
      if (shop.area >= 65) return '#a7f3d0';  
      return '#e0f2fe';                       
    } else if (STATE.currentMapMode === 'type') {
      switch (shop.type) {
        case '餐飲旗艦': case '主題餐廳': case '手作烘焙': case '連鎖餐飲': return '#fecdd3'; 
        case '共享辦公': case '銀行金融': return '#ddd6fe'; 
        case '兒童教育': case '複合書店': return '#fed7aa'; 
        default: return '#e0f2fe'; 
      }
    }
    return '#ffffff';
  },

  getShopStrokeColor(shop) {
    if (STATE.currentStyleMode === 'original') return '#475569'; 
    switch (shop.status) {
      case 'reserved': return '#f59e0b';
      case 'rent_sale': return '#0ea5e9';
      case 'available': return '#10b981';
      default: return '#64748b';
    }
  }
};