import { supabase } from '../../lib/supabaseClient';
import Head from 'next/head';
export default function ListingDetail({ listing, media }: any){
  const playbackId = media?.mux_playback_id;
  return (<main style={{padding:24,maxWidth:900,margin:'0 auto'}}>
    <Head><script defer src="https://cdn.jsdelivr.net/npm/@mux/mux-player"></script></Head>
    <h1>{listing?.title || 'Listing'}</h1>
    {playbackId ? (<mux-player stream-type="on-demand" playback-id={playbackId} style={{width:'100%',height:'480px',background:'#000'}} auto-play="muted" controls></mux-player>)
      : (<div style={{background:'#eee',height:320,display:'flex',alignItems:'center',justifyContent:'center'}}><span>No video yet (or processing... refresh soon)</span></div>)}
    <div style={{marginTop:16}}>
      <p><b>Price:</b> ${listing?.price}</p>
      <p><b>Beds/Baths:</b> {listing?.beds} / {listing?.baths}</p>
      <p><b>Sqft:</b> {listing?.sqft}</p>
      <p><b>Address:</b> {listing?.address}, {listing?.city}, {listing?.state} {listing?.zip}</p>
    </div>
  </main>);
}
export async function getServerSideProps(ctx:any){
  const id = ctx.params.id;
  const { data: listing } = await supabase.from('listings').select('*').eq('id', id).single();
  const { data: media } = await supabase.from('media_assets').select('*').eq('listing_id', id).order('created_at',{ascending:false}).limit(1).single();
  return { props: { listing: listing || null, media: media || null } };
}
