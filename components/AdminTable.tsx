'use client';

import { useMemo, useState } from 'react';
import type { Shop } from '@/lib/types';

interface Props {
  initialShops: Shop[];
}

const emptyShop: Shop = {
  id: '',
  name: '',
  city: '',
  address: '',
  lat: 0,
  lng: 0,
  photo: '',
  tags: [],
  rating: 0,
  avgPrice: 0,
  keywords: []
};

export default function AdminTable({ initialShops }: Props) {
  const [shops, setShops] = useState<Shop[]>(initialShops);
  const [form, setForm] = useState<Shop>(emptyShop);
  const [editing, setEditing] = useState<string | null>(null);

  const isValid = useMemo(
    () => form.id && form.name && form.city && form.address && form.photo && form.lat && form.lng,
    [form]
  );

  const reset = () => {
    setForm(emptyShop);
    setEditing(null);
  };

  const submit = () => {
    if (!isValid) return;

    if (editing) {
      setShops((prev) => prev.map((shop) => (shop.id === editing ? form : shop)));
      reset();
      return;
    }

    setShops((prev) => [...prev, form]);
    reset();
  };

  const startEdit = (shop: Shop) => {
    setEditing(shop.id);
    setForm(shop);
  };

  const remove = (id: string) => {
    setShops((prev) => prev.filter((shop) => shop.id !== id));
    if (editing === id) reset();
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
      <h1 className="text-3xl font-black">咖啡店数据管理台</h1>
      <div className="sticker grid gap-3 p-4 md:grid-cols-2">
        {[
          ['id', '店铺 ID'],
          ['name', '店名'],
          ['city', '城市'],
          ['address', '地址'],
          ['photo', '照片 URL'],
          ['lat', '纬度'],
          ['lng', '经度'],
          ['rating', '评分'],
          ['avgPrice', '人均'],
          ['tags', '标签（逗号分隔）'],
          ['keywords', '评价关键词（逗号分隔）']
        ].map(([key, label]) => (
          <label key={key} className="text-sm">
            <span className="mb-1 block font-medium">{label}</span>
            <input
              className="w-full rounded-xl border bg-white px-3 py-2"
              value={Array.isArray(form[key as keyof Shop]) ? (form[key as keyof Shop] as string[]).join(',') : String(form[key as keyof Shop] ?? '')}
              onChange={(event) => {
                const value = event.target.value;
                if (key === 'lat' || key === 'lng' || key === 'rating' || key === 'avgPrice') {
                  setForm((prev) => ({ ...prev, [key]: Number(value) }));
                  return;
                }
                if (key === 'tags' || key === 'keywords') {
                  setForm((prev) => ({ ...prev, [key]: value.split(',').map((v) => v.trim()).filter(Boolean) }));
                  return;
                }
                setForm((prev) => ({ ...prev, [key]: value }));
              }}
            />
          </label>
        ))}
        <div className="md:col-span-2 flex gap-3">
          <button onClick={submit} type="button" className="rounded-xl bg-bean px-4 py-2 text-white">
            {editing ? '保存修改' : '新增店铺'}
          </button>
          <button onClick={reset} type="button" className="rounded-xl border px-4 py-2">
            清空
          </button>
        </div>
      </div>

      <div className="sticker overflow-x-auto p-4">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2">店名</th>
              <th>城市</th>
              <th>评分</th>
              <th>人均</th>
              <th className="text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {shops.map((shop) => (
              <tr key={shop.id} className="border-b last:border-0">
                <td className="py-2">{shop.name}</td>
                <td>{shop.city}</td>
                <td>{shop.rating}</td>
                <td>¥{shop.avgPrice}</td>
                <td className="space-x-2 text-right">
                  <button type="button" className="rounded-lg border px-2 py-1" onClick={() => startEdit(shop)}>
                    编辑
                  </button>
                  <button type="button" className="rounded-lg border px-2 py-1 text-red-600" onClick={() => remove(shop.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
