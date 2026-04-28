import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);

  return NextResponse.json({
    message: '预留导入接口已就绪，可在此接入高德 POI / Web 服务 API 批量导入。',
    received: payload
  });
}
