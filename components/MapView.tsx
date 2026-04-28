'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Shop } from '@/lib/types';

declare global {
  interface Window {
    AMap: any;
  }
}

interface Props {
  shops: Shop[];
}

async function loadAmapScript(apiKey: string): Promise<void> {
  if (window.AMap) return;

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${apiKey}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('高德地图脚本加载失败'));
    document.head.appendChild(script);
  });
}

export default function MapView({ shops }: Props) {
  const [selected, setSelected] = useState<Shop | null>(null);
  const [city, setCity] = useState('全部');
  const [error, setError] = useState<string | null>(null);

  const cities = useMemo(() => ['全部', ...new Set(shops.map((shop) => shop.city))], [shops]);
  const filtered = useMemo(() => shops.filter((shop) => city === '全部' || shop.city === city), [shops, city]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_AMAP_KEY;
    if (!apiKey) {
      setError('缺少 NEXT_PUBLIC_AMAP_KEY，请在 .env.local 中配置后重启服务。');
      return;
    }

    let map: any;
    let markers: any[] = [];

    loadAmapScript(apiKey)
      .then(() => {
        map = new window.AMap.Map('coffee-map', {
          zoom: 5,
          center: [104.1954, 35.8617],
          mapStyle: 'amap://styles/fresh'
        });

        markers = filtered.map((shop) => {
          const marker = new window.AMap.Marker({
            position: [shop.lng, shop.lat],
            title: shop.name,
            label: {
              content: `☕ ${shop.name}`,
              direction: 'right'
            }
          });
          marker.on('click', () => setSelected(shop));
          map.add(marker);
          return marker;
        });

        map.setFitView(markers);
      })
      .catch((err: Error) => {
        setError(err.message);
      });

    return () => {
      markers.forEach((marker) => marker?.setMap?.(null));
      map?.destroy?.();
    };
  }, [filtered]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8">
      <div className="sticker flex flex-wrap items-center justify-between gap-3 p-4">
        <h1 className="text-2xl font-black">全国咖啡店地图</h1>
        <select className="rounded-xl border bg-white px-3 py-2" value={city} onChange={(event) => setCity(event.target.value)}>
          {cities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <div className="sticker p-4 text-red-600">{error}</div>
      ) : (
        <div id="coffee-map" className="h-[70vh] overflow-hidden rounded-3xl border border-white/50" />
      )}

      {selected && (
        <div className="sticker fixed bottom-6 right-6 z-10 w-[320px] p-4">
          <img src={selected.photo} alt={selected.name} className="h-40 w-full rounded-2xl object-cover" />
          <h2 className="mt-3 text-xl font-bold">{selected.name}</h2>
          <p className="text-sm text-bean/70">{selected.address}</p>
          <p className="mt-2 text-sm">⭐ {selected.rating} · 人均 ¥{selected.avgPrice}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {selected.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-amber-100 px-2 py-1 text-xs text-mocha">
                {tag}
              </span>
            ))}
          </div>
          <a
            href={`https://uri.amap.com/navigation?to=${selected.lng},${selected.lat},${encodeURIComponent(selected.name)}&mode=car&policy=1&src=mypage`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block rounded-xl bg-bean px-3 py-2 text-sm font-semibold text-white"
          >
            一键导航
          </a>
        </div>
      )}
    </div>
  );
}
