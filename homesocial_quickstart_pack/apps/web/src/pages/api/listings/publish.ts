import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { id } = req.body || {};
  if (!id) return res.status(400).json({ error: 'missing id' });
  const { error } = await supabase.from('listings').update({ status: 'published' }).eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true });
}
