# 中国全国咖啡店地图 (Next.js + TypeScript + Tailwind CSS)

一个年轻化、潮流感的咖啡地图 Web 项目，支持首页探索、地图点位浏览、店铺详情弹窗、后台 CRUD 管理，并预留 API 接口。

## 功能概览

- 首页：搜索框、城市筛选、热门标签，卡片化展示门店。
- 地图页：接入高德地图 JS API，展示咖啡店点位并支持点击查看详情弹窗。
- 数据层：当前从 `data/shops.json` 读取 mock 数据，后续可替换数据库。
- admin 页面：新增、编辑、删除店铺数据（前端状态层演示）。
- API Route：
  - `GET /api/shops`
  - `POST /api/shops/import-amap`

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## 本地运行

1. 安装依赖

```bash
npm install
```

2. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的高德 JS API Key：

```env
NEXT_PUBLIC_AMAP_KEY=你的高德地图JSAPIKey
```

3. 启动开发环境

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 生产部署

### 方案一：Vercel（推荐）

1. 将仓库推送到 GitHub。
2. 在 Vercel 导入项目。
3. 在项目环境变量中配置 `NEXT_PUBLIC_AMAP_KEY`。
4. 触发部署。

### 方案二：Node 服务器

```bash
npm run build
npm run start
```

同样需在部署环境中配置 `.env.local` 或系统环境变量 `NEXT_PUBLIC_AMAP_KEY`。

## 目录结构

```text
app/
  page.tsx                 # 首页
  map/page.tsx             # 地图页
  admin/page.tsx           # 管理页
  api/shops/route.ts       # 店铺列表 API
  api/shops/import-amap/route.ts  # 高德导入预留 API
components/
  HomeHero.tsx
  MapView.tsx
  AdminTable.tsx
data/
  shops.json               # mock 数据
lib/
  types.ts
```

## 后续可扩展方向

- admin 页面接入真实数据库与鉴权。
- `/api/shops/import-amap` 对接高德 POI / 地理编码服务。
- 增加收藏、路线规划、门店营业状态等功能。
