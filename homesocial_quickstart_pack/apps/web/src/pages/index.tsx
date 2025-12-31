import Link from "next/link";
import { useMemo, useState } from "react";

type Listing = {
  id: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  status: "For Sale" | "For Rent" | "Coming Soon";
  imageUrl?: string; // placeholder for later
};

function formatPrice(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function Home() {
  const [query, setQuery] = useState("");

  // Temporary mock data so the UI looks real. Later: replace with Supabase fetch.
  const listings: Listing[] = useMemo(
    () => [
      {
        id: "phx-001",
        price: 565000,
        beds: 4,
        baths: 3,
        sqft: 2180,
        address: "1847 E Meadowview Dr",
        city: "Phoenix",
        state: "AZ",
        zip: "85022",
        status: "For Sale",
      },
      {
        id: "phx-002",
        price: 389000,
        beds: 3,
        baths: 2,
        sqft: 1540,
        address: "3321 W Desert Bloom Ln",
        city: "Phoenix",
        state: "AZ",
        zip: "85053",
        status: "Coming Soon",
      },
      {
        id: "phx-003",
        price: 725000,
        beds: 5,
        baths: 4,
        sqft: 2975,
        address: "4210 N Vista Ridge Ave",
        city: "Phoenix",
        state: "AZ",
        zip: "85018",
        status: "For Sale",
      },
      {
        id: "phx-004",
        price: 2450,
        beds: 2,
        baths: 2,
        sqft: 1120,
        address: "101 W Monroe St Unit 1904",
        city: "Phoenix",
        state: "AZ",
        zip: "85003",
        status: "For Rent",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return listings;
    return listings.filter((l) => {
      const hay = `${l.address} ${l.city} ${l.state} ${l.zip} ${l.status}`.toLowerCase();
      return hay.includes(q);
    });
  }, [listings, query]);

  return (
    <main>
      {/* Top Nav */}
      <header className="nav">
        <div className="navInner">
          <Link href="/" className="brand">
            <span className="logoDot" aria-hidden />
            <span className="brandText">HomeSocial</span>
          </Link>

          <nav className="navLinks">
            <Link href="/" className="navLink">Browse</Link>
            <Link href="/create" className="navLink">Create Listing</Link>
          </nav>

          <div className="navCta">
            <Link href="/create" className="btnPrimary">
              + New Listing
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="heroInner">
          <div className="heroCopy">
            <h1 className="heroTitle">Find your next place in Phoenix.</h1>
            <p className="heroSub">
              A clean, modern MVP to publish listings fast — with photos/video support coming next.
            </p>

            <div className="searchRow">
              <div className="searchInputWrap">
                <span className="searchIcon" aria-hidden>⌕</span>
                <input
                  className="searchInput"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by address, city, ZIP, or status…"
                />
              </div>

              <button
                className="btnSecondary"
                onClick={() => {
                  // This is just UI right now. Later we’ll wire filters / routing.
                  const el = document.getElementById("results");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Search
              </button>
            </div>

            <div className="pillRow">
              <span className="pill">For Sale</span>
              <span className="pill">For Rent</span>
              <span className="pill">Coming Soon</span>
              <span className="pill muted">No login needed to browse</span>
            </div>
          </div>

          <div className="heroCard" aria-label="Product preview">
            <div className="heroCardTop">
              <div className="heroStat">
                <div className="heroStatLabel">Live</div>
                <div className="heroStatValue">Vercel</div>
              </div>
              <div className="heroStat">
                <div className="heroStatLabel">MVP</div>
                <div className="heroStatValue">Phoenix</div>
              </div>
              <div className="heroStat">
                <div className="heroStatLabel">Next</div>
                <div className="heroStatValue">Supabase</div>
              </div>
            </div>
            <div className="heroCardBody">
              <div className="skeletonImg" />
              <div className="skeletonLine wide" />
              <div className="skeletonLine" />
              <div className="skeletonLine" />
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section" id="results">
        <div className="sectionInner">
          <div className="sectionHeader">
            <div>
              <h2 className="sectionTitle">Published Listings</h2>
              <p className="sectionSub">
                Showing <b>{filtered.length}</b> listing{filtered.length === 1 ? "" : "s"} (mock data for now).
              </p>
            </div>

            <Link href="/create" className="btnPrimary">
              Create a Listing
            </Link>
          </div>

          <div className="grid">
            {filtered.map((l) => (
              <article key={l.id} className="card">
                <div className="cardMedia">
                  <div className="mediaPlaceholder">
                    <span className="mediaBadge">{l.status}</span>
                    <span className="mediaHint">Photo / Video</span>
                  </div>
                </div>

                <div className="cardBody">
                  <div className="priceRow">
                    <div className="price">{l.status === "For Rent" ? `${formatPrice(l.price)}/mo` : formatPrice(l.price)}</div>
                    <div className="meta">
                      {l.beds} bd · {l.baths} ba · {l.sqft.toLocaleString()} sqft
                    </div>
                  </div>

                  <div className="address">{l.address}</div>
                  <div className="location">
                    {l.city}, {l.state} {l.zip}
                  </div>

                  <div className="cardActions">
                    <button className="btnGhost" onClick={() => alert("Next step: Listing Details page (/listings/[id])")}>
                      View details
                    </button>
                    <button className="btnGhost" onClick={() => alert("Next step: Save/favorite")}>
                      ♡ Save
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="footerNote">
            Next up: replace mock data with Supabase + add a real Listing Details page.
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footerInner">
          <div className="footerBrand">
            <span className="logoDot" aria-hidden />
            <span className="brandText">HomeSocial</span>
          </div>
          <div className="footerLinks">
            <a className="footerLink" href="#" onClick={(e) => e.preventDefault()}>
              Privacy
            </a>
            <a className="footerLink" href="#" onClick={(e) => e.preventDefault()}>
              Terms
            </a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        :global(html, body) {
          padding: 0;
          margin: 0;
          background: #0b0f17;
          color: #e9eef7;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji",
            "Segoe UI Emoji";
        }

        main {
          min-height: 100vh;
        }

        .nav {
          position: sticky;
          top: 0;
          z-index: 30;
          background: rgba(11, 15, 23, 0.72);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .navInner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: inherit;
          font-weight: 700;
          letter-spacing: 0.2px;
        }

        .brandText {
          font-size: 16px;
        }

        .logoDot {
          width: 14px;
          height: 14px;
          border-radius: 999px;
          background: linear-gradient(135deg, #3aa0ff, #8d5cff);
          box-shadow: 0 0 0 3px rgba(61, 160, 255, 0.18);
        }

        .navLinks {
          display: none;
          gap: 12px;
          margin-left: 6px;
        }

        .navLink {
          color: rgba(233, 238, 247, 0.82);
          text-decoration: none;
          font-size: 14px;
          padding: 8px 10px;
          border-radius: 10px;
        }

        .navLink:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #fff;
        }

        .navCta {
          margin-left: auto;
          display: flex;
          gap: 10px;
        }

        .btnPrimary {
          background: linear-gradient(135deg, #3aa0ff, #8d5cff);
          color: white;
          border: none;
          padding: 10px 14px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          box-shadow: 0 10px 30px rgba(61, 160, 255, 0.18);
        }

        .btnPrimary:hover {
          filter: brightness(1.05);
        }

        .btnSecondary {
          background: rgba(255, 255, 255, 0.08);
          color: #e9eef7;
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 12px 14px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .btnSecondary:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .hero {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: radial-gradient(900px 420px at 10% 10%, rgba(61, 160, 255, 0.18), transparent 65%),
            radial-gradient(800px 420px at 90% 20%, rgba(141, 92, 255, 0.16), transparent 60%);
        }

        .heroInner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 42px 18px 34px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }

        .heroTitle {
          margin: 0;
          font-size: 36px;
          line-height: 1.12;
          letter-spacing: -0.4px;
        }

        .heroSub {
          margin: 12px 0 0;
          color: rgba(233, 238, 247, 0.78);
          max-width: 56ch;
          font-size: 16px;
          line-height: 1.6;
        }

        .searchRow {
          margin-top: 18px;
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .searchInputWrap {
          flex: 1;
          min-width: 260px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 12px 12px;
        }

        .searchIcon {
          opacity: 0.75;
        }

        .searchInput {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          color: #e9eef7;
          font-size: 14px;
        }

        .pillRow {
          margin-top: 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pill {
          font-size: 12px;
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(233, 238, 247, 0.9);
        }

        .pill.muted {
          opacity: 0.75;
        }

        .heroCard {
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          overflow: hidden;
        }

        .heroCardTop {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255, 255, 255, 0.08);
        }

        .heroStat {
          padding: 14px;
          background: rgba(11, 15, 23, 0.55);
        }

        .heroStatLabel {
          font-size: 11px;
          color: rgba(233, 238, 247, 0.72);
        }

        .heroStatValue {
          margin-top: 4px;
          font-size: 14px;
          font-weight: 800;
        }

        .heroCardBody {
          padding: 14px;
        }

        .skeletonImg {
          height: 120px;
          border-radius: 14px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06));
          background-size: 180% 100%;
          animation: shimmer 1.6s ease-in-out infinite;
        }

        .skeletonLine {
          height: 10px;
          margin-top: 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
        }

        .skeletonLine.wide {
          width: 80%;
        }

        @keyframes shimmer {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 0%;
          }
        }

        .section {
          padding: 28px 0 40px;
        }

        .sectionInner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 18px;
        }

        .sectionHeader {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .sectionTitle {
          margin: 0;
          font-size: 18px;
          letter-spacing: -0.2px;
        }

        .sectionSub {
          margin: 6px 0 0;
          color: rgba(233, 238, 247, 0.75);
          font-size: 13px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }

        .card {
          border-radius: 18px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .cardMedia {
          height: 150px;
          background: rgba(255, 255, 255, 0.04);
        }

        .mediaPlaceholder {
          height: 100%;
          padding: 12px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          background: linear-gradient(135deg, rgba(61, 160, 255, 0.18), rgba(141, 92, 255, 0.12));
        }

        .mediaBadge {
          font-size: 12px;
          font-weight: 800;
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(11, 15, 23, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .mediaHint {
          font-size: 12px;
          opacity: 0.85;
        }

        .cardBody {
          padding: 14px;
        }

        .priceRow {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }

        .price {
          font-size: 18px;
          font-weight: 900;
          letter-spacing: -0.2px;
        }

        .meta {
          font-size: 12px;
          color: rgba(233, 238, 247, 0.78);
        }

        .address {
          margin-top: 10px;
          font-size: 14px;
          font-weight: 800;
        }

        .location {
          margin-top: 4px;
          font-size: 13px;
          color: rgba(233, 238, 247, 0.78);
        }

        .cardActions {
          margin-top: 12px;
          display: flex;
          gap: 10px;
        }

        .btnGhost {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #e9eef7;
          padding: 9px 12px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .btnGhost:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .footerNote {
          margin-top: 14px;
          font-size: 12px;
          color: rgba(233, 238, 247, 0.7);
        }

        .footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 18px 0;
          background: rgba(255, 255, 255, 0.02);
        }

        .footerInner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .footerBrand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footerLinks {
          display: flex;
          gap: 12px;
        }

        .footerLink {
          color: rgba(233, 238, 247, 0.72);
          text-decoration: none;
          font-size: 13px;
        }

        .footerLink:hover {
          color: #fff;
        }

        @media (min-width: 900px) {
          .navLinks {
            display: flex;
          }
          .heroInner {
            grid-template-columns: 1.25fr 0.75fr;
            align-items: start;
            gap: 18px;
          }
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1100px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </main>
  );
}
