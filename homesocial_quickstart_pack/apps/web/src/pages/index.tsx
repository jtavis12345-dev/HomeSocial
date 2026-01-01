import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const demoListings = [
  { id: "1", price: "$485,000", beds: 3, baths: 2, sqft: "1,842", address: "1247 W Camelback Rd, Phoenix, AZ", tag: "New" },
  { id: "2", price: "$699,000", beds: 4, baths: 3, sqft: "2,610", address: "3919 E Osborn Rd, Phoenix, AZ", tag: "Open House" },
  { id: "3", price: "$329,900", beds: 2, baths: 2, sqft: "1,105", address: "801 N 3rd St Unit 210, Phoenix, AZ", tag: "Hot" },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>HomeSocial — Phoenix MVP</title>
        <meta name="description" content="HomeSocial Phoenix MVP" />
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
                style={{ height: "48px", width: "auto", objectFit: "contain" }}
              />
            </Link>

            <nav className="nav">
              <Link href="/" className="navLink">
                Browse
              </Link>
              <Link href="/create" className="navLink">
                Create Listing
              </Link>
            </nav>

            <div className="actions">
              <Link href="/create" className="btnPrimary">
                + New Listing
              </Link>
            </div>
          </div>
        </header>

        <main className="main">
          <section className="hero">
            <div className="heroLeft">
              <h1>
                Find a home.
                <br />
                <span className="gold">Share the story.</span>
              </h1>
              <p className="sub">
                A sleek, Realtor/Zillow-style browse experience — with video-first listings later (Mux),
                and fast search + filters as we grow.
              </p>

              <div className="searchCard" role="search" aria-label="Search listings">
                <div className="searchRow">
                  <input className="input" placeholder="City, neighborhood, address, ZIP…" />
                  <button className="btnGold" type="button">
                    Search
                  </button>
                </div>
                <div className="chips">
                  <button className="chip" type="button">
                    For Sale
                  </button>
                  <button className="chip" type="button">
                    Under $500k
                  </button>
                  <button className="chip" type="button">
                    3+ Beds
                  </button>
                  <button className="chip" type="button">
                    Pool
                  </button>
                </div>
              </div>
            </div>

            <div className="heroRight">
              <div className="statGrid">
                <div className="stat">
                  <div className="statNum">Phoenix</div>
                  <div className="statLabel">Initial market</div>
                </div>
                <div className="stat">
                  <div className="statNum">Video</div>
                  <div className="statLabel">Mux-ready roadmap</div>
                </div>
                <div className="stat">
                  <div className="statNum">Fast</div>
                  <div className="statLabel">Next.js on Vercel</div>
                </div>
                <div className="stat">
                  <div className="statNum">Social</div>
                  <div className="statLabel">Agent + creator friendly</div>
                </div>
              </div>

              <div className="heroCard">
                <div className="heroCardTop">
                  <span className="pill">MVP</span>
                  <span className="muted">Phase 1 scaffold</span>
                </div>
                <div className="heroCardTitle">Next Up</div>
                <ul className="heroList">
                  <li>Listings page (real data)</li>
                  <li>Create Listing form → save</li>
                  <li>Auth + roles</li>
                  <li>Video upload + playback</li>
                </ul>
                <Link href="/create" className="btnPrimary full">
                  Build a listing
                </Link>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="sectionHead">
              <h2>Featured Listings</h2>
              <p className="muted">Sample layout (we’ll swap in real DB listings next).</p>
            </div>

            <div className="grid">
              {demoListings.map((l) => (
                <article key={l.id} className="card">
                  <div className="thumb">
                    <div className="tag">{l.tag}</div>
                    <div className="thumbInner">
                      <div className="thumbLogo">HS</div>
                      <div className="thumbHint">Photo/video coming soon</div>
                    </div>
                  </div>

                  <div className="cardBody">
                    <div className="priceRow">
                      <div className="price">{l.price}</div>
                      <div className="facts">
                        {l.beds} bd • {l.baths} ba • {l.sqft} sqft
                      </div>
                    </div>
                    <div className="addr">{l.address}</div>

                    <div className="cardActions">
                      <button className="btnGhost" type="button">
                        Save
                      </button>
                      <button className="btnGold" type="button">
                        View
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <footer className="footer">
            <div className="footerInner">
              <div className="muted">© {new Date().getFullYear()} HomeSocial</div>
              <div className="muted">Phoenix MVP • Built on Vercel</div>
            </div>
          </footer>
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
          background: radial-gradient(1200px 800px at 20% -20%, rgba(212, 175, 55, 0.18), transparent 60%),
            radial-gradient(900px 700px at 90% 10%, rgba(212, 175, 55, 0.12), transparent 55%),
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
        .actions {
          margin-left: auto;
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 22px 18px 60px;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 18px;
          padding: 22px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 18px;
          background: rgba(12, 12, 12, 0.75);
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.55);
        }
        .hero h1 {
          font-size: 44px;
          line-height: 1.05;
          margin: 0 0 10px;
          letter-spacing: -0.02em;
        }
        .gold {
          background: linear-gradient(90deg, #f7e7a7, #d4af37 55%, #f7e7a7);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .sub {
          margin: 0 0 18px;
          color: rgba(243, 241, 234, 0.75);
          font-size: 16px;
          line-height: 1.5;
          max-width: 680px;
        }

        .searchCard {
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(8, 8, 8, 0.8);
          padding: 14px;
        }
        .searchRow {
          display: flex;
          gap: 10px;
        }
        .input {
          flex: 1;
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
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 10px;
        }
        .chip {
          border: 1px solid rgba(255, 255, 255, 0.10);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(243, 241, 234, 0.85);
          padding: 8px 10px;
          border-radius: 999px;
          cursor: pointer;
        }
        .chip:hover {
          border-color: rgba(212, 175, 55, 0.35);
          background: rgba(212, 175, 55, 0.08);
        }

        .heroRight {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .statGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .stat {
          padding: 12px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(255, 255, 255, 0.03);
        }
        .statNum {
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .statLabel {
          margin-top: 4px;
          color: rgba(243, 241, 234, 0.70);
          font-size: 12px;
        }

        .heroCard {
          padding: 14px;
          border-radius: 14px;
          border: 1px solid rgba(212, 175, 55, 0.18);
          background: linear-gradient(180deg, rgba(212, 175, 55, 0.09), rgba(10, 10, 10, 0.6));
        }
        .heroCardTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .pill {
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(212, 175, 55, 0.35);
          color: rgba(247, 231, 167, 0.95);
          background: rgba(212, 175, 55, 0.08);
        }
        .heroCardTitle {
          font-weight: 800;
          margin-bottom: 8px;
        }
        .heroList {
          margin: 0 0 12px;
          padding-left: 18px;
          color: rgba(243, 241, 234, 0.80);
        }
        .heroList li {
          margin: 6px 0;
        }

        .section {
          margin-top: 22px;
        }
        .sectionHead {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 14px;
          margin: 0 0 10px;
        }
        .sectionHead h2 {
          margin: 0;
          font-size: 18px;
          letter-spacing: -0.01em;
        }
        .muted {
          color: rgba(243, 241, 234, 0.65);
          font-size: 13px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .card {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(12, 12, 12, 0.75);
          transition: transform 0.15s ease, border-color 0.15s ease;
        }
        .card:hover {
          transform: translateY(-2px);
          border-color: rgba(212, 175, 55, 0.20);
        }
        .thumb {
          height: 160px;
          position: relative;
          background: radial-gradient(500px 200px at 30% 20%, rgba(212, 175, 55, 0.22), transparent 60%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.1));
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .tag {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(212, 175, 55, 0.35);
          color: rgba(247, 231, 167, 0.95);
          background: rgba(0, 0, 0, 0.35);
        }
        .thumbInner {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .thumbLogo {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #121212;
          background: linear-gradient(90deg, #f7e7a7, #d4af37 55%, #f7e7a7);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.18);
        }
        .thumbHint {
          color: rgba(243, 241, 234, 0.7);
          font-size: 12px;
        }

        .cardBody {
          padding: 12px;
        }
        .priceRow {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: baseline;
        }
        .price {
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        .facts {
          color: rgba(243, 241, 234, 0.7);
          font-size: 12px;
        }
        .addr {
          margin-top: 6px;
          color: rgba(243, 241, 234, 0.85);
          font-size: 13px;
          line-height: 1.3;
        }

        .cardActions {
          margin-top: 12px;
          display: flex;
          gap: 10px;
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
          font-weight: 700;
        }
        .btnPrimary:hover {
          background: rgba(212, 175, 55, 0.16);
          border-color: rgba(212, 175, 55, 0.35);
        }
        .btnGold {
          height: 44px;
          padding: 0 16px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-weight: 800;
          color: #1a1300;
          background: linear-gradient(90deg, #f7e7a7, #d4af37 55%, #f7e7a7);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.16);
        }
        .btnGold:hover {
          filter: brightness(1.03);
        }
        .btnGhost {
          flex: 1;
          height: 40px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.10);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(243, 241, 234, 0.9);
          cursor: pointer;
        }
        .btnGhost:hover {
          background: rgba(255, 255, 255, 0.06);
        }
        .full {
          width: 100%;
        }

        .footer {
          margin-top: 26px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .footerInner {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        @media (max-width: 980px) {
          .hero {
            grid-template-columns: 1fr;
          }
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
