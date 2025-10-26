import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const body = req.body || {};
  const insert = {
    owner_id: '00000000-0000-0000-0000-000000000000',
    title: body.title || null, address: body.address || null, city: body.city || null, state: body.state || null, zip: body.zip || null,
    price: body.price ? Number(body.price) : null, beds: body.beds ? Number(body.beds) : null, baths: body.baths ? Number(body.baths) : null, sqft: body.sqft ? Number(body.sqft) : null,
    status: 'draft'
  };
  const { data, error } = await supabase.from('listings').insert(insert).select('id').single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ id: data?.id });
}
