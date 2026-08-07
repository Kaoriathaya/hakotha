import { supabase } from '@/lib/supabaseClient';

export type ProductSize = {
  label: string;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price?: number;
  image: string;
  images?: string[] | string;
  description: string;
  colors: string[];
  singleColorOptions?: string[];
  singlecoloroptions?: string[];
  sizes: ProductSize[];
  priceAdjustments?: Record<string, number>;
};

export async function getProducts() {
  if (!supabase) {
    throw new Error('Supabase client tidak tersedia. Pastikan env NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY diatur.');
  }

  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return (data as Product[]) ?? [];
}

export async function getProductBySlug(slug: string) {
  if (!supabase) {
    throw new Error('Supabase client tidak tersedia. Pastikan env NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY diatur.');
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(error.message);
  }

  return (data as Product) ?? null;
}
