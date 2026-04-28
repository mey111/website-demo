import { NextResponse } from 'next/server';
import shops from '@/data/shops.json';

export async function GET() {
  return NextResponse.json({ data: shops });
}
