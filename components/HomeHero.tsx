'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import shops from '@/data/shops.json';

const popularTags = ['特调', '手冲', '拍照出片', '夜间营业', '宠物友好', '安静办公'];

export default function HomeHero() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('全部');

  const cities = useMemo(() => ['全部', ...new Set(shops.map((shop) => shop.city))], []);

  const filtered = shops.filter((shop) => {
    const matchCity = city === '全部' || shop.city === city;
    const matchQuery =
      !query ||
      shop.name.includes(query) ||
      shop.tags.join(' ').includes(query) ||
      shop.keywords.join(' ').includes(query);
    return matchCity && matchQuery;
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="sticker relative overflow-hidden p-8 md:p-12">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-crema/50 blur-2xl" />
        <div className="absolute -bottom-6 left-16 h-20 w-20 rounded-full bg-pink-300/40 blur-2xl" />
        <p className="mb-3 inline-flex rounded-full bg-white px-4 py-1 text-sm font-semibold text-mocha">☕ 中国全国咖啡店地图</p>
        <h1 className="text-3xl font-black leading-tight md:text-5xl">在地图上寻找你的下一杯灵感</h1>
        <p className="mt-4 max-w-2xl text-sm text-bean/70 md:text-base">
          城市漫游、精品手冲、夜间拿铁，一张地图串联全国年轻咖啡文化。
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_220px_auto]">
          <input
            className="rounded-2xl border border-white/60 bg-white px-4 py-3 outline-none ring-mocha/30 focus:ring"
            placeholder="搜索店名 / 标签 / 关键词"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            className="rounded-2xl border border-white/60 bg-white px-4 py-3 outline-none ring-mocha/30 focus:ring"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          >
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <Link
            className="rounded-2xl bg-bean px-6 py-3 text-center font-semibold text-white transition hover:translate-y-[-1px]"
            href="/map"
          >
            打开地图
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button key={tag} type="button" onClick={() => setQuery(tag)} className="rounded-full bg-white px-3 py-1 text-sm text-mocha">
              #{tag}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, 6).map((shop) => (
          <article key={shop.id} className="sticker p-4">
            <p className="text-xs text-mocha/70">{shop.city}</p>
            <h2 className="mt-1 text-xl font-bold">{shop.name}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-bean/70">{shop.address}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {shop.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-amber-100 px-2 py-1 text-mocha">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm">⭐ {shop.rating} · 人均 ¥{shop.avgPrice}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
