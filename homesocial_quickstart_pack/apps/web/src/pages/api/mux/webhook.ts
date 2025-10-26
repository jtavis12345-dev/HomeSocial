import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  try{
    const event = req.body;
    if (event?.type === 'video.asset.ready'){
      const asset = event.data;
      const playbackId = asset?.playback_ids?.[0]?.id;
      const passthrough = asset?.passthrough; // "listing:UUID"
      const listingId = (passthrough || '').split('listing:')[1];
      if (listingId && playbackId){
        await supabase.from('media_assets').insert({ listing_id: listingId, kind: 'video', mux_asset_id: asset.id, mux_playback_id: playbackId });
      }
    }
    return res.status(200).json({ ok: true });
  }catch(e:any){
    return res.status(500).json({ error: e?.message || 'webhook error' });
  }
}
export const config = { api: { bodyParser: { sizeLimit: '5mb' } } };
