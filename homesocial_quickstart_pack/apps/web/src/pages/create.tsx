import { useState } from 'react';
export default function CreateListing(){
  const [form,setForm]=useState({ title:'',address:'',city:'',state:'',zip:'',price:'',beds:'',baths:'',sqft:'' });
  const [listingId,setListingId]=useState(''); const [uploadUrl,setUploadUrl]=useState(''); const [uploading,setUploading]=useState(false); const [published,setPublished]=useState(false);
  function onChange(e:any){ setForm({...form,[e.target.name]:e.target.value}); }
  async function createListing(){ const r=await fetch('/api/listings/create',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)}); const j=await r.json(); setListingId(j.id); alert('Listing created. Now upload a video.'); }
  async function getUploadUrl(){ const r=await fetch('/api/mux/create-upload-url',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({listingId})}); const j=await r.json(); setUploadUrl(j.url); }
  async function uploadVideo(e:any){ const f=e.target.files[0]; if(!f||!uploadUrl) return; setUploading(true); const put=await fetch(uploadUrl,{method:'PUT',headers:{'Content-Type':'application/octet-stream'},body:f}); setUploading(false); if(put.ok) alert('Upload complete. Wait ~1–2 min, then open the listing page.'); else alert('Upload failed.'); }
  async function publish(){ const r=await fetch('/api/listings/publish',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:listingId})}); if((await r.json()).ok){ setPublished(true); alert('Published!'); } }
  return (<main style={{padding:24,maxWidth:900,margin:'0 auto'}}>
    <h1>Create Listing</h1>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>{Object.keys(form).map(k=>(<label key={k}><div style={{fontSize:12,color:'#555'}}>{k.toUpperCase()}</div><input name={k} onChange={onChange} style={{width:'100%',padding:8,border:'1px solid #ccc'}}/></label>))}</div>
    <div style={{marginTop:16}}><button onClick={createListing} disabled={!!listingId} style={{padding:'8px 12px'}}>1) Save Listing</button></div>
    {listingId&&(<div style={{marginTop:24}}><h3>Upload a Video</h3><button onClick={getUploadUrl} style={{padding:'8px 12px'}}>2) Get Upload URL</button>{uploadUrl&&(<div style={{marginTop:12}}><input type="file" accept="video/*" onChange={uploadVideo} disabled={uploading}/></div>)}</div>)}
    {listingId&&(<div style={{marginTop:24}}><button onClick={publish} disabled={published} style={{padding:'8px 12px'}}>3) Publish Listing</button></div>)}
    {listingId&&(<div style={{marginTop:24}}><a href={`/listings/${listingId}`} target="_blank" rel="noreferrer">Open Listing Page</a></div>)}
  </main>);
}
