import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
export default function Home({ listings }: any){
  return (<main style={{padding:24,maxWidth:900,margin:'0 auto'}}>
    <h1>HomeSocial — Phoenix MVP</h1>
    <p><Link href="/create">Create a Listing</Link></p>
    <h2>Published Listings</h2>
    <ul>{listings.map((l:any)=>(<li key={l.id}><Link href={`/listings/${l.id}`}>{l.title||'Untitled'} — ${l.price}</Link></li>))}</ul>
  </main>);
}
export async function getServerSideProps(){
  const { data } = await supabase.from('listings').select('id,title,price').eq('status','published').order('created_at',{ascending:false});
  return { props: { listings: data || [] } };
}
