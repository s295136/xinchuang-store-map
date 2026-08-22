const shopsDataFallback = [
  { id: "215", name: "福慧路215號", area: 123.06, status: "reserved", type: "餐飲旗艦", price: 135400, rentUnitStr: "1,100元/坪", saleUnitPriceStr: "91.23萬/坪", salePrice: "11,403萬元", desc: "臨福慧路黃金角池，雙面採光，具大基地地標採光優勢，是全區最高具地標能見度的首選黃金地標。", road: "福慧路", originColor: "normal", tenant: "Cafe!N", engineering: "高壓電力配電組、預留重油煙排煙風管、獨立污水排水系統、挑高樓板設計 (7.2m)、高容量排水水箱", layers: { f1: 20.01, f2: 21.50, mezzanine: 6.66, roof: 15.77, balcony: 4.032 } },
  { id: "213", name: "福慧路213號", area: 102.25, status: "rent_sale", type: "", price: 97200, rentUnitStr: "950元/坪", saleUnitPriceStr: "89.80萬/坪", salePrice: "9,182萬元", desc: "臨福慧路主幹道客流交會處。挑高大氣，極具品牌零售與美學展示空間的發揮潛能。", road: "福慧路", originColor: "normal", tenant: "", engineering: "高壓電力配電組,獨立分體式冷氣預留孔,弱電光纖網路基礎設施,挑高樓板設計 (7.2m),獨立排水安全系統", layers: { f1: 16.04, f2: 17.24, mezzanine: 5.31, roof: 14.64, balcony: 3.233 } },
  { id: "211", name: "福慧路211號", area: 102.28, status: "rent_sale", type: "特色咖啡", price: 92100, rentUnitStr: "900元/坪", saleUnitPriceStr: "89.79萬/坪", salePrice: "9,184萬元", desc: "採光充足、氛圍靜謐，前庭腹地大，可完美打造戶外露天咖啡座與文青生活風格空間。", road: "福慧路", originColor: "normal", tenant: "", engineering: "高壓電力配電組,輕食給排水管線預留,預留排煙專用風管,獨立分體式冷氣預留孔,挑高樓板設計 (7.2m)", layers: { f1: 16.06, f2: 17.26, mezzanine: 5.32, roof: 14.61, balcony: 3.236 } },
  { id: "209", name: "福慧路209號", area: 106.76, status: "rent_sale", type: "科技展售", price: 96100, rentUnitStr: "900元/坪", saleUnitPriceStr: "89.77萬/坪", salePrice: "9,584萬元", desc: "大開間、無柱化空間結構。利於自由切割與靈活陣列，是未來高科技體驗展示中心或智慧家居館的首選。", road: "福慧路", originColor: "normal", tenant: "", engineering: "高壓電力配電組,備用發電機高架線路,高階專用地板電路網,挑高樓板設計 (7.2m),中央冷氣出風口預留組", layers: { f1: 16.75, f2: 18.00, mezzanine: 5.60, roof: 15.25, balcony: 3.375 } },
  { id: "207", name: "福慧路207號", area: 98.73, status: "rent_sale", type: "醫療美學", price: 88900, rentUnitStr: "900元/坪", saleUnitPriceStr: "89.76萬/坪", salePrice: "8,862萬元", desc: "高隱密性、動線獨立，專為高端尊榮客戶提供絕佳的隱私保護。適合引進高端醫美美學診所、抗衰中心或私人健康管理會所。", road: "福慧路", originColor: "normal", tenant: "", engineering: "獨立進排水氣控配線,高標準消毒通風管線,不斷電系統連接備用,高壓力電力配電組", layers: { f1: 15.59, f2: 16.70, mezzanine: 4.96, roof: 14.14, balcony: 3.142 } },
  { id: "205", name: "福慧路205號", area: 109.14, status: "rent_sale", type: "", price: 103700, rentUnitStr: "950元/坪", saleUnitPriceStr: "107.02萬/坪", salePrice: "11,680萬元", desc: "與鄰近社區人流動線交會。溫馨寧靜的內嵌空間，最適合打造結合書香、獨立文創沙龍與手沖單品咖啡的複合式知性聚落。", road: "福慧路", originColor: "normal", tenant: "", engineering: "多孔高密度弱電系統,高阻隔隔音門窗基礎,高壓電力配電組,挑高樓板設計 (7.2m),多功能新風換氣系統", layers: { f1: 42.47, f2: 0, mezzanine: 12.49, roof: 0, balcony: 5.33 } },
  { id: "203", name: "福慧路203號", area: 113.03, status: "rent_sale", type: "", price: 107400, rentUnitStr: "950元/坪", saleUnitPriceStr: "106.77萬/坪", salePrice: "12,068萬元", desc: "擁有極為完備的主力餐飲工程基礎，具備大流量獨立排污管路與高壓用電，可大幅節省品牌餐飲店裝工程成本。", road: "福慧路", originColor: "normal", tenant: "", engineering: "高壓電力配電組,預留排煙專用風管,獨立污水排水系統,挑高樓板設計 (7.2m),重油排水分離槽", layers: { f1: 44.07, f2: 0, mezzanine: 13.02, roof: 0, balcony: 5.35 } },
  { id: "201", name: "福慧路201號", area: 75.56, status: "rent_sale", type: "健身美體", price: 71800, rentUnitStr: "950元/坪", saleUnitPriceStr: "109.17萬/坪", salePrice: "8,249萬元", desc: "挑高無壓迫感，高抗震載重結構，適合引進高端瑜珈沙龍、皮拉提斯門店，或現代健身工作坊。", road: "福慧路", originColor: "normal", tenant: "", engineering: "高抗震防音結構牆底座,多功能獨立排水系統,高功率新風氣流系統,預留大電量用電組,弱電光纖網路基礎設施", layers: { f1: 29.62, f2: 0, mezzanine: 8.77, roof: 0, balcony: 3.36 } },
  { id: "199", name: "福慧路199號", area: 41.11, status: "rent_sale", type: "生活服務", price: 39100, rentUnitStr: "950元/坪", saleUnitPriceStr: "108.25萬/坪", salePrice: "4,450萬元", desc: "位於中庭南側核心轉折處，精緻高坪效，最適合作為智慧社區收發、生活便利服務、連鎖精洗快洗或頂級美甲美睫工作室。", road: "福慧路", originColor: "grey", tenant: "", engineering: "給排水管線組網,高容量弱電線路預留,獨立分體式冷氣預留孔,消防安全吸頂系統", layers: { f1: 17.07, f2: 0, mezzanine: 5.62, roof: 0, balcony: 0 } },
  { id: "197", name: "福慧路197號", area: 67.79, status: "available", type: "", price: 0, rentUnitStr: "", saleUnitPriceStr: "面議", salePrice: "面議 / 非銷售戶", desc: "", road: "福慧路", originColor: "normal", tenant: "", engineering: "", layers: { f1: 28.94, f2: 0, mezzanine: 8.47, roof: 0, balcony: 0 } },
  { id: "195", name: "福慧路195號", area: 67.20, status: "available", type: "", price: 0, rentUnitStr: "", saleUnitPriceStr: "面議", salePrice: "面議 / 非銷售戶", desc: "", road: "福慧路", originColor: "normal", tenant: "", engineering: "", layers: { f1: 28.62, f2: 0, mezzanine: 8.47, roof: 0, balcony: 0 } },
  { id: "193", name: "福慧路193號", area: 66.97, status: "available", type: "", price: 0, rentUnitStr: "", saleUnitPriceStr: "面議", salePrice: "面議 / 非銷售戶", desc: "", road: "福慧路", originColor: "normal", tenant: "", engineering: "", layers: { f1: 28.70, f2: 0, mezzanine: 8.27, roof: 0, balcony: 0 } },
  { id: "191", name: "福慧路191號", area: 66.85, status: "available", type: "", price: 0, rentUnitStr: "", saleUnitPriceStr: "面議", salePrice: "面議 / 非銷售戶", desc: "", road: "福慧路", originColor: "normal", tenant: "", engineering: "", layers: { f1: 28.63, f2: 0, mezzanine: 8.27, roof: 0, balcony: 0 } },
  { id: "189", name: "福慧路189號", area: 63.19, status: "available", type: "", price: 0, rentUnitStr: "", saleUnitPriceStr: "面議", salePrice: "面議 / 非銷售戶", desc: "", road: "福慧路角地", originColor: "normal", tenant: "", engineering: "", layers: { f1: 27.25, f2: 0, mezzanine: 7.63, roof: 0, balcony: 0 } },
  { id: "13", name: "新知八路13號", area: 50.79, status: "available", type: "", price: 0, rentUnitStr: "", saleUnitPriceStr: "面議", salePrice: "面議 / 非銷售戶", desc: "", road: "新知八路", originColor: "cyan", tenant: "", engineering: "", layers: { f1: 21.69, f2: 0, mezzanine: 6.36, roof: 0, balcony: 0 } },
  { id: "11", name: "新知八路11號", area: 115.61, status: "available", type: "", price: 0, rentUnitStr: "", saleUnitPriceStr: "面議", salePrice: "面議 / 非銷售戶", desc: "", road: "新知八路", originColor: "yellow", tenant: "", engineering: "", layers: { f1: 50.24, f2: 0, mezzanine: 11.00, roof: 0, balcony: 2.62 } },
  { id: "9", name: "新知八路9號", area: 109.73, status: "available", type: "", price: 0, rentUnitStr: "", saleUnitPriceStr: "面議", salePrice: "面議 / 非銷售戶", desc: "", road: "新知八路", originColor: "cyan", tenant: "", engineering: "", layers: { f1: 46.22, f2: 0, mezzanine: 12.21, roof: 0, balcony: 2.19 } },
  { id: "7", name: "新知八路7號", area: 55.53, status: "rent_sale", type: "藥妝零售", price: 61100, rentUnitStr: "1,100元/坪", saleUnitPriceStr: "138.66萬/坪", salePrice: "7,700萬元", desc: "新知八路與南側通道角地，雙面櫥窗。能見度極高，非常適合社區藥局或個人護理與醫美零售專門門市。", road: "新知八路", originColor: "yellow", tenant: "", engineering: "大落地窗雙面櫥窗玻璃,高壓電力配電組,弱電光纖網路基礎設施,獨立分體式冷氣預留孔", layers: { f1: 22.16, f2: 0, mezzanine: 6.26, roof: 0, balcony: 2.22 } },
  { id: "5", name: "新知八路5號", area: 57.42, status: "rent_sale", type: "", price: 57500, rentUnitStr: "1,000元/坪", saleUnitPriceStr: "122.78萬/坪", salePrice: "7,050萬元", desc: "採光通風長廊，已設置獨立高規格給排水，合適引入寵物美容、高端貓狗寄宿、或精品寵物選品生活館。", road: "新知八路", originColor: "grey", tenant: "", engineering: "高壓電力配電組,預留排煙專用風管,獨立污水排水系統,消防灑水安全系統", layers: { f1: 24.72, f2: 0, mezzanine: 6.98, roof: 0, balcony: 0.00 } },
  { id: "3", name: "新知八路3號", area: 113.40, status: "rent_sale", type: "", price: 107800, rentUnitStr: "950元/坪", saleUnitPriceStr: "95.24萬/坪", salePrice: "10,800萬元", desc: "面寬大、設有獨立後門卸貨貨運專用動線。適宜連鎖生鮮超市、大型美妝連鎖店入駐，店面營運效率卓著。", road: "新知八路", originColor: "yellow", tenant: "", engineering: "金融級防盜監控電網基礎,金庫防爆結構預留,大挑高氣派大理石立柱正面,高壓電力配電組,弱電光纖網路基礎設施", layers: { f1: 46.06, f2: 0, mezzanine: 13.12, roof: 0, balcony: 3.45 } }
];

function parseCSV(text) {
  const lines = [];
  let row = [""];
  let insideQuote = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        row[row.length - 1] += '"';
        i++; 
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      row.push("");
    } else if ((char === '\r' || char === '\n') && !insideQuote) {
      if (char === '\r' && nextChar === '\n') i++;
      lines.push(row);
      row = [""];
    } else {
      row[row.length - 1] += char;
    }
  }
  if (row.length > 1 || row[0] !== "") lines.push(row);
  return lines;
}

function mapCSVRowToShop(row) {
  const rawName = row[0]?.trim(); 
  if (!rawName) return null;

  const match = rawName.match(/\d+/);
  if (!match) return null;
  const id = match[0];

  const area = parseFloat(row[2]?.replace(/,/g, '')) || 0;
  const f1 = parseFloat(row[4]?.replace(/,/g, '')) || 0;
  const mezzanine = parseFloat(row[5]?.replace(/,/g, '')) || 0;
  const f2 = parseFloat(row[6]?.replace(/,/g, '')) || 0;
  const roof = parseFloat(row[7]?.replace(/,/g, '')) || 0;
  const balcony = parseFloat(row[8]?.replace(/,/g, '')) || 0;

  let status = "available"; 
  const rawStatus = row[9]?.trim() || "";
  if (rawStatus.includes("評估") || rawStatus.includes("洽談") || rawStatus.includes("Reserved")) {
    status = "reserved";
  } else if (rawStatus.includes("可租") && rawStatus.includes("可售")) {
    status = "rent_sale";
  } else if (rawStatus.includes("可承租") || rawStatus.includes("Available") || rawStatus.includes("可租")) {
    status = "available";
  }

  const price = parseInt(row[10]?.replace(/,/g, '')) || 0;
  const rentUnitStr = row[11]?.trim() || "";
  const saleUnitPriceStr = row[12]?.trim() || "";
  const salePrice = row[13]?.trim() || (price > 0 ? "面議 / 歡迎洽詢" : "面議 / 非銷售戶");

  const road = row[17]?.trim() || "連外道路";
  const type = row[16]?.trim() || "";
  const tenant = row[18]?.trim() || "";
  const desc = row[19]?.trim() || "";
  const engineering = row[20]?.trim() || "";

  const localBlueprint = shopsDataFallback.find(s => s.id === id);
  const originColor = localBlueprint ? localBlueprint.originColor : "normal";

  return {
    id,
    name: rawName,
    area,
    status,
    type,
    price,
    rentUnitStr,
    saleUnitPriceStr,
    salePrice,
    desc,
    road,
    originColor,
    tenant,
    engineering,
    layers: { f1, f2, mezzanine, roof, balcony }
  };
}

async function syncWithGoogleSheet() {
  UI.setSyncState('loading');

  try {
    const response = await fetch(CONFIG.sheetCsvUrl);
    if (!response.ok) throw new Error("CORS or Network Error");

    const rawCsvText = await response.text();
    const parsedCsvRows = parseCSV(rawCsvText);

    if (parsedCsvRows && parsedCsvRows.length > 1) {
      const newShopsData = [];
      for (let i = 1; i < parsedCsvRows.length; i++) {
        const row = parsedCsvRows[i];
        if (!row || row.length < 3 || !row[0]) continue; 
        const mappedShop = mapCSVRowToShop(row);
        if (mappedShop) newShopsData.push(mappedShop);
      }

      if (newShopsData.length > 0) {
        STATE.shopsData = newShopsData;
        UI.setSyncState('success', STATE.shopsData.length);
        UI.refreshAll();
        UI.showToast('<i class="fa-solid fa-circle-check text-emerald-500 mr-2"></i> 已成功同步 Google 試算表即時數據');
        return;
      }
    }
    throw new Error("Parsed data empty");
  } catch (error) {
    console.warn("載入雲端試算表失敗，切換至本機備用資料庫：", error);
    STATE.shopsData = JSON.parse(JSON.stringify(shopsDataFallback));
    UI.setSyncState('error');
    UI.refreshAll();
    UI.showToast('<i class="fa-solid fa-triangle-exclamation text-amber-500 mr-2"></i> 雲端同步失敗，已載入內建備用數據庫');
  }
}