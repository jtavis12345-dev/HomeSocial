import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CreateListing() {
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("3");
  const [baths, setBaths] = useState("2");
  const [sqft, setSqft] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Saved (placeholder). Next step: wire this to Supabase + Mux.");
  }

  return (
    <>
      <Head>
        <title>Create Listing — HomeSocial</title>
      </Head>

      <div className="page">
        <header className="header">
          <div className="headerInner">
            <Link href="/" className="brand" aria-label="HomeSocial Home">
              <Image
                src="/homesocial-logo.png"
                alt="HomeSocial"
                width={340}
                height={90}
                priority
                style={{ height: "44px", width: "auto", objectFit: "contain" }}
              />
            </Link>

            <nav className="nav">
              <Link href="/" className="navLink">
                Browse
              </Link>
              <Link href="/create" className="navLink active">
                Create Listing
              </Link>
            </nav>

            <div className="actions">
              <Link href="/" className="btnGhostLink">
                ← Back
              </Link>
            </div>
          </div>
        </header>

        <main className="main">
          <div className="titleRow">
            <h1>Create a Listing</h1>
            <p className="muted">Clean layout now — we’ll add real save + video upload next.</p>
          </div>

          <div className="layout">
            <form className="card" onSubmit={onSubmit}>
              <div className="cardTitle">Listing Details</div>

              <label className="label">
                Address
                <input className="input" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, Phoenix, AZ" />
              </label>

              <div className="row">
                <label className="label">
                  Price
                  <input className="input" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="$485,000" />
                </label>

                <label className="label">
                  Sqft
                  <input className="input" value={sqft} onChange={(e) => setSqft(e.target.value)} placeholder="1842" />
                </label>
              </div>

              <div className="row">
                <label className="label">
                  Beds
                  <select className="input" value={beds} onChange={(e) => setBeds(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                </label>

                <label className="label">
                  Baths
                  <select className="input" value={baths} onChange={(e) => setBaths(e.target.value)}>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                    <option value="3">3+</option>
                  </select>
                </label>
              </div>

              <div className="upload">
                <div className="uploadTitle">Video / Photos</div>
                <div className="uploadBox">
                  <div className="goldBadge">Coming next</div>
                  <div className="uploadText">Mux direct upload + thumbnail card</div>
                </div>
              </div>

              <button className="btnGold" type="submit">
                Save Listing
              </button>
            </form>

            <aside className="side">
              <div className="sideCard">
                <div className="sideTitle">Roadmap (Create Flow)</div>
                <ol className="list">
                  <li>Save listing to DB (Supabase)</li>
                  <li>Auth: agent/admin roles</li>
                  <li>Mux upload → store playbackId</li>
                  <li>Listing detail page with video player</li>
                </ol>
                <Link href="/" className="btnPrimary full">
                  Back to Browse
                </Link>
              </div>

              <div className="sideCard subtle">
                <div className="sideTitle">Style</div>
                <div className="muted">
                  This page uses the HomeSocial black + gold palette to match your new logo.
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      <style jsx>{`
        :global(html, body) {
          padding: 0;
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji",
            "Segoe UI Emoji";
          background: #050505;
          color: #f3f1ea;
        }
        :global(a) {
          color: inherit;
          text-decoration: none;
        }

        .page {
          min-height: 100vh;
          background: radial-gradient(1100px 700px at 20% -20%, rgba(212, 175, 55, 0.18), transparent 60%),
            linear-gradient(180deg, #050505, #070707 60%, #050505);
        }

        .header {
          position: sticky;
          top: 0;
          z-index: 20;
          background: rgba(6, 6, 6, 0.65);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .headerInner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .brand {
          display: inline-flex;
          align-items: center;
        }
        .nav {
          display: flex;
          gap: 14px;
          margin-left: 10px;
        }
        .navLink {
          padding: 10px 10px;
          border-radius: 10px;
          color: rgba(243, 241, 234, 0.9);
        }
        .navLink:hover {
          background: rgba(255, 255, 255, 0.06);
        }
        .active {
          border: 1px solid rgba(212, 175, 55, 0.22);
          background: rgba(212, 175, 55, 0.08);
        }
        .actions {
          margin-left: auto;
        }

        .main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 22px 18px 60px;
        }

        .titleRow h1 {
          margin: 0;
          font-size: 34px;
          letter-spacing: -0.02em;
        }
        .muted {
          color: rgba(243, 241, 234, 0.65);
          font-size: 13px;
          margin-top: 6px;
        }

        .layout {
          margin-top: 14px;
          display: grid;
          grid-template-columns: 1fr 0.8fr;
          gap: 14px;
          align-items: start;
        }

        .card {
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(12, 12, 12, 0.75);
          padding: 16px;
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.55);
        }
        .cardTitle {
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
          color: rgba(243, 241, 234, 0.85);
          font-size: 13px;
        }
        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .input {
          height: 44px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.10);
          background: rgba(0, 0, 0, 0.6);
          color: #f3f1ea;
          padding: 0 14px;
          outline: none;
        }
        .input:focus {
          border-color: rgba(212, 175, 55, 0.55);
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.14);
        }

        .upload {
          margin: 12px 0 14px;
        }
        .uploadTitle {
          font-weight: 800;
          margin-bottom: 8px;
        }
        .uploadBox {
          border-radius: 14px;
          border: 1px dashed rgba(212, 175, 55, 0.35);
          background: rgba(212, 175, 55, 0.06);
          padding: 14px;
        }
        .goldBadge {
          display: inline-block;
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          color: rgba(247, 231, 167, 0.95);
          border: 1px solid rgba(212, 175, 55, 0.35);
          background: rgba(0, 0, 0, 0.25);
          margin-bottom: 8px;
        }
        .uploadText {
          color: rgba(243, 241, 234, 0.75);
          font-size: 13px;
        }

        .side {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sideCard {
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(12, 12, 12, 0.75);
          padding: 16px;
        }
        .subtle {
          background: rgba(255, 255, 255, 0.03);
        }
        .sideTitle {
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }
        .list {
          margin: 0 0 12px;
          padding-left: 18px;
          color: rgba(243, 241, 234, 0.80);
        }
        .list li {
          margin: 6px 0;
        }

        .btnGold {
          height: 44px;
          width: 100%;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-weight: 900;
          color: #1a1300;
          background: linear-gradient(90deg, #f7e7a7, #d4af37 55%, #f7e7a7);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.16);
        }
        .btnGold:hover {
          filter: brightness(1.03);
        }
        .btnPrimary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid rgba(212, 175, 55, 0.22);
          background: rgba(212, 175, 55, 0.10);
          color: rgba(247, 231, 167, 0.95);
          font-weight: 800;
        }
        .btnPrimary:hover {
          background: rgba(212, 175, 55, 0.16);
          border-color: rgba(212, 175, 55, 0.35);
        }
        .btnGhostLink {
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.10);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(243, 241, 234, 0.9);
        }
        .btnGhostLink:hover {
          background: rgba(255, 255, 255, 0.06);
        }
        .full {
          width: 100%;
        }

        @media (max-width: 980px) {
          .layout {
            grid-template-columns: 1fr;
          }
          .row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
