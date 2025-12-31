import Link from "next/link";
import { useMemo, useState } from "react";

type FormState = {
  title: string;
  price: string;
  status: "For Sale" | "For Rent" | "Coming Soon";
  beds: string;
  baths: string;
  sqft: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  description: string;
};

export default function CreateListing() {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: "",
    price: "",
    status: "For Sale",
    beds: "",
    baths: "",
    sqft: "",
    address: "",
    city: "Phoenix",
    state: "AZ",
    zip: "",
    description: "",
  });

  const isValid = useMemo(() => {
    // MVP-level validation (we’ll tighten later)
    return (
      form.title.trim().length >= 3 &&
      form.price.trim().length > 0 &&
      form.address.trim().length >= 4 &&
      form.city.trim().length >= 2 &&
      form.state.trim().length >= 2 &&
      form.zip.trim().length >= 5
    );
  }, [form]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) {
      alert("Please fill in the required fields (title, price, address, city/state/zip).");
      return;
    }

    setSaving(true);
    try {
      // Placeholder: next step is wiring this to Supabase insert + Mux upload flow
      await new Promise((r) => setTimeout(r, 700));
      alert("Saved (mock). Next: connect to Supabase + add upload.");
      // Optionally redirect:
      // window.location.href = "/";
    } finally {
      setSaving(false);
    }
  }

  return (
    <main>
      <header className="nav">
        <div className="navInner">
          <Link href="/" className="brand">
            <span className="logoDot" aria-hidden />
            <span className="brandText">HomeSocial</span>
          </Link>

          <div className="navLinks">
            <Link href="/" className="navLink">Browse</Link>
          </div>

          <div className="navCta">
            <Link href="/" className="btnSecondary">← Back</Link>
          </div>
        </div>
      </header>

      <section className="wrap">
        <div className="head">
          <h1 className="title">Create a Listing</h1>
          <p className="sub">
            This is the “publisher” flow. Next we’ll connect it to Supabase and add Mux direct upload for video.
          </p>
        </div>

        <form className="panel" onSubmit={onSubmit}>
          <div className="grid">
            <div className="field">
              <label>Listing Title <span className="req">*</span></label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., Modern Phoenix Home with Pool"
              />
            </div>

            <div className="field">
              <label>Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as FormState["status"] })}>
                <option>For Sale</option>
                <option>For Rent</option>
                <option>Coming Soon</option>
              </select>
            </div>

            <div className="field">
              <label>Price <span className="req">*</span></label>
              <input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder={form.status === "For Rent" ? "e.g., 2450" : "e.g., 565000"}
                inputMode="numeric"
              />
              <div className="hint">
                {form.status === "For Rent" ? "Monthly rent amount (numbers only)" : "Sale price (numbers only)"}
              </div>
            </div>

            <div className="field">
              <label>Beds</label>
              <input value={form.beds} onChange={(e) => setForm({ ...form, beds: e.target.value })} placeholder="e.g., 3" inputMode="numeric" />
            </div>

            <div className="field">
              <label>Baths</label>
              <input value={form.baths} onChange={(e) => setForm({ ...form, baths: e.target.value })} placeholder="e.g., 2" inputMode="numeric" />
            </div>

            <div className="field">
              <label>Sqft</label>
              <input value={form.sqft} onChange={(e) => setForm({ ...form, sqft: e.target.value })} placeholder="e.g., 1540" inputMode="numeric" />
            </div>
          </div>

          <div className="divider" />

          <div className="grid">
            <div className="field span2">
              <label>Street Address <span className="req">*</span></label>
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="e.g., 1847 E Meadowview Dr"
              />
            </div>

            <div className="field">
              <label>City <span className="req">*</span></label>
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>

            <div className="field">
              <label>State <span className="req">*</span></label>
              <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} maxLength={2} />
            </div>

            <div className="field">
              <label>ZIP <span className="req">*</span></label>
              <input value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} placeholder="e.g., 85018" inputMode="numeric" />
            </div>
          </div>

          <div className="divider" />

          <div className="field">
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Write a short, buyer-friendly description…"
              rows={6}
            />
          </div>

          <div className="divider" />

          <div className="uploadBox">
            <div className="uploadTitle">Media Upload (Next Step)</div>
            <div className="uploadSub">
              We’ll add: image gallery + Mux direct upload for video, then show them on the listing card/details page.
            </div>
            <button
              type="button"
              className="btnGhost"
              onClick={() => alert("Next step: add Mux upload widget + store asset IDs in Supabase")}
            >
              Add Photos / Video (coming soon)
            </button>
          </div>

          <div className="actions">
            <Link href="/" className="btnSecondary">Cancel</Link>
            <button className="btnPrimary" disabled={!isValid || saving} type="submit">
              {saving ? "Saving…" : "Publish Listing"}
            </button>
          </div>

          {!isValid && (
            <div className="error">
              Fill required fields: <b>Title</b>, <b>Price</b>, <b>Address</b>, <b>City/State/ZIP</b>.
            </div>
          )}
        </form>
      </section>

      <style jsx>{`
        :global(html, body) {
          padding: 0;
          margin: 0;
          background: #0b0f17;
          color: #e9eef7;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji",
            "Segoe UI Emoji";
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
          max-width: 980px;
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
          margin-left: 8px;
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

        .wrap {
          max-width: 980px;
          margin: 0 auto;
          padding: 28px 18px 60px;
        }

        .head {
          margin-bottom: 14px;
        }

        .title {
          margin: 0;
          font-size: 26px;
          letter-spacing: -0.2px;
        }

        .sub {
          margin: 8px 0 0;
          color: rgba(233, 238, 247, 0.75);
          line-height: 1.6;
          max-width: 70ch;
          font-size: 14px;
        }

        .panel {
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 16px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .field label {
          display: block;
          font-size: 12px;
          color: rgba(233, 238, 247, 0.78);
          margin-bottom: 6px;
          font-weight: 700;
        }

        .req {
          color: #ff7a7a;
        }

        input,
        select,
        textarea {
          width: 100%;
          box-sizing: border-box;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 12px 12px;
          color: #e9eef7;
          outline: none;
          font-size: 14px;
        }

        textarea {
          resize: vertical;
        }

        input:focus,
        select:focus,
        textarea:focus {
          border-color: rgba(61, 160, 255, 0.7);
          box-shadow: 0 0 0 3px rgba(61, 160, 255, 0.18);
        }

        .hint {
          margin-top: 6px;
          font-size: 12px;
          color: rgba(233, 238, 247, 0.65);
        }

        .divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 14px 0;
        }

        .uploadBox {
          border-radius: 16px;
          padding: 14px;
          background: radial-gradient(900px 420px at 10% 10%, rgba(61, 160, 255, 0.12), transparent 65%),
            rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .uploadTitle {
          font-weight: 900;
          letter-spacing: -0.1px;
        }

        .uploadSub {
          margin-top: 6px;
          color: rgba(233, 238, 247, 0.72);
          font-size: 13px;
          line-height: 1.55;
        }

        .actions {
          margin-top: 14px;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btnPrimary {
          background: linear-gradient(135deg, #3aa0ff, #8d5cff);
          color: white;
          border: none;
          padding: 10px 14px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(61, 160, 255, 0.18);
        }

        .btnPrimary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          box-shadow: none;
        }

        .btnSecondary {
          background: rgba(255, 255, 255, 0.08);
          color: #e9eef7;
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 10px 14px;
          border-radius: 12px;
          font-weight: 800;
          text-decoration: none;
          cursor: pointer;
        }

        .btnSecondary:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .btnGhost {
          margin-top: 10px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #e9eef7;
          padding: 10px 12px;
          border-radius: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .btnGhost:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .error {
          margin-top: 12px;
          font-size: 12px;
          color: rgba(255, 122, 122, 0.92);
        }

        .span2 {
          grid-column: span 1;
        }

        @media (min-width: 900px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .span2 {
            grid-column: span 2;
          }
        }
      `}</style>
    </main>
  );
}
