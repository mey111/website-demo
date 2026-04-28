const coffeeShops = [
  {
    name: "海岸线手冲咖啡",
    city: "上海",
    lat: 31.2304,
    lng: 121.4737,
    feature: "冠军手冲 / 小众豆单",
    keywords: ["出品稳定", "豆香明显", "安静好拍照"],
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "胡同慢烘焙",
    city: "北京",
    lat: 39.9042,
    lng: 116.4074,
    feature: "自家烘焙 / 复古空间",
    keywords: ["服务热情", "手工甜品佳", "拉花漂亮"],
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "珠江夜话咖啡馆",
    city: "广州",
    lat: 23.1291,
    lng: 113.2644,
    feature: "夜间营业 / 创意特调",
    keywords: ["氛围感强", "特调新颖", "适合约会"],
    image:
      "https://images.unsplash.com/photo-1494314671902-399b18174975?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "南山山海咖啡",
    city: "深圳",
    lat: 22.5431,
    lng: 114.0579,
    feature: "海景露台 / 精品拼配",
    keywords: ["景观绝佳", "奶咖顺滑", "周末人气高"],
    image:
      "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "青城山下咖啡实验室",
    city: "成都",
    lat: 30.5728,
    lng: 104.0668,
    feature: "实验室风格 / 冷萃专门",
    keywords: ["创意十足", "口味层次多", "社群活动多"],
    image:
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "西湖边的晨雾",
    city: "杭州",
    lat: 30.2741,
    lng: 120.1551,
    feature: "景区步行可达 / 低因选项",
    keywords: ["环境舒服", "早餐组合好", "排队可接受"],
    image:
      "https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "鹭岛巷子咖啡",
    city: "厦门",
    lat: 24.4798,
    lng: 118.0894,
    feature: "海盐拿铁 / 文艺展览",
    keywords: ["拍照出片", "店员友好", "甜点细腻"],
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=80",
  },
];

const map = L.map("map", {
  center: [35.8617, 104.1954],
  zoom: 4,
  minZoom: 3,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const searchInput = document.getElementById("searchInput");
const featureFilter = document.getElementById("featureFilter");
const shopList = document.getElementById("shopList");

const featureSet = new Set();
coffeeShops.forEach((shop) => featureSet.add(shop.feature));
[...featureSet].sort().forEach((feature) => {
  const option = document.createElement("option");
  option.value = feature;
  option.textContent = feature;
  featureFilter.appendChild(option);
});

let markerState = [];

function popupTemplate(shop) {
  return `
    <article class="popup-card">
      <h3>${shop.name}</h3>
      <p><strong>城市：</strong>${shop.city}</p>
      <img src="${shop.image}" alt="${shop.name} 店铺照片" loading="lazy" />
      <p><strong>特色：</strong>${shop.feature}</p>
      <p><strong>用户评价关键词：</strong>${shop.keywords.join("、")}</p>
    </article>
  `;
}

function clearMarkers() {
  markerState.forEach((item) => item.marker.remove());
  markerState = [];
}

function matchesFilter(shop, searchValue, featureValue) {
  const fulltext = `${shop.name} ${shop.city} ${shop.feature} ${shop.keywords.join(" ")}`.toLowerCase();
  const q = searchValue.toLowerCase().trim();
  const passSearch = !q || fulltext.includes(q);
  const passFeature = !featureValue || shop.feature === featureValue;
  return passSearch && passFeature;
}

function render() {
  const searchValue = searchInput.value;
  const featureValue = featureFilter.value;
  const visible = coffeeShops.filter((shop) => matchesFilter(shop, searchValue, featureValue));

  clearMarkers();
  shopList.innerHTML = "";

  visible.forEach((shop) => {
    const marker = L.marker([shop.lat, shop.lng]).addTo(map).bindPopup(popupTemplate(shop));
    markerState.push({ shop, marker });

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="shop-name">${shop.name}</div>
      <div class="shop-city">${shop.city}</div>
      <div class="shop-tags">${shop.feature}<br/>${shop.keywords.join(" / ")}</div>
    `;
    li.addEventListener("click", () => {
      map.setView([shop.lat, shop.lng], 11);
      marker.openPopup();
    });
    shopList.appendChild(li);
  });

  if (visible.length > 0) {
    const group = L.featureGroup(markerState.map((item) => item.marker));
    map.fitBounds(group.getBounds().pad(0.25));
  }

  if (visible.length === 0) {
    const li = document.createElement("li");
    li.textContent = "没有匹配的咖啡店，请调整筛选条件。";
    shopList.appendChild(li);
  }
}

searchInput.addEventListener("input", render);
featureFilter.addEventListener("change", render);

render();
