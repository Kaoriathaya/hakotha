import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export async function GET(request: Request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase admin key tidak tersedia' },
        { status: 500 }
      );
    }

    const url = new URL(request.url);
    const code = url.searchParams.get('code')?.trim();
    const phone = url.searchParams.get('phone')?.trim();

    if (!code || !phone) {
      return NextResponse.json(
        { error: 'Kode pesanan dan nomor telepon diperlukan' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('status')
      .eq('code', code)
      .eq('phone', phone)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Pesanan tidak ditemukan atau nomor telepon tidak cocok' },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: data.status });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase admin key tidak tersedia' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, phone, items, total } = body;

    if (!name?.trim() || !phone?.trim() || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Data pesanan tidak lengkap' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert([
        {
          name: name.trim(),
          phone: phone.trim(),
          items,
          total: Number(total),
          status: 'pending',
        },
      ])
      .select('code')
      .single();

    if (error || !data?.code) {
      return NextResponse.json(
        { error: error?.message ?? 'Gagal menyimpan pesanan' },
        { status: 500 }
      );
    }

    return NextResponse.json({ code: data.code });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
