import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const listingId = req.body?.listingId;
  if (!listingId) return res.status(400).json({ error: 'missing listingId' });
  const id = process.env.MUX_TOKEN_ID; const secret = process.env.MUX_TOKEN_SECRET;
  if (!id || !secret) return res.status(500).json({ error: 'MUX credentials missing' });
  const url = 'https://api.mux.com/video/v1/uploads';
  const payload = { new_asset_settings: { playback_policy: ['public'], passthrough: `listing:${listingId}` }, cors_origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000' };
  const basic = Buffer.from(`${id}:${secret}`).toString('base64');
  const resp = await fetch(url, { method: 'POST', headers: { 'Content-Type':'application/json','Authorization':`Basic ${basic}` }, body: JSON.stringify(payload) });
  const json = await resp.json();
  if (!resp.ok) return res.status(500).json({ error: json?.error || 'mux error' });
  const uploadUrl = json?.data?.url;
  if (!uploadUrl) return res.status(500).json({ error: 'no upload url' });
  res.json({ url: uploadUrl });
}
