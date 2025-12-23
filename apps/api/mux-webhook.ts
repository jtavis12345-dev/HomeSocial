// Pseudo-code for Mux webhook handler
export default async function handler(req, res) {
  // TODO: verify signature using MUX_WEBHOOK_SECRET
  const evt = req.body;
  if (evt?.type === 'video.asset.ready') {
    // upsert media_assets with mux_asset_id + mux_playback_id
  }
  return res.status(200).json({ ok: true });
}
