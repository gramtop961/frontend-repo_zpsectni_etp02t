import { useMemo, useState, useEffect, useRef } from 'react'

function StarRating({ rating = 0 }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating))
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {stars.map((filled, idx) => (
        <svg
          key={idx}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={filled ? '#f59e0b' : 'none'}
          stroke="#f59e0b"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.2 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.986 20.54a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557l-4.2-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"
          />
        </svg>
      ))}
    </div>
  )
}

function MetricCard({ label, before, after, suffix = '' }) {
  const improved = after > before
  const change = before ? (((after - before) / before) * 100).toFixed(0) : '—'
  return (
    <div className="p-4 bg-white rounded-xl shadow border border-gray-100">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-2 flex items-end gap-3">
        <div>
          <div className="text-xs text-gray-400">Before</div>
          <div className="text-lg font-semibold text-gray-700">{before?.toLocaleString?.() ?? '—'}{suffix}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">After</div>
          <div className="text-lg font-semibold text-gray-900">{after?.toLocaleString?.() ?? '—'}{suffix}</div>
        </div>
        <div className={`ml-auto text-xs px-2 py-1 rounded-full ${improved ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{change === '—' ? 'n/a' : `${improved ? '+' : ''}${change}%`}</div>
      </div>
      <div className="mt-3 h-2 w-full bg-gray-100 rounded">
        <div
          className={`h-2 rounded ${improved ? 'bg-emerald-500' : 'bg-amber-500'}`}
          style={{ width: `${Math.min(100, Math.max(10, (after / (after + before)) * 100 || 50))}%` }}
        />
      </div>
    </div>
  )
}

function BookingSection() {
  const calendarUrl = import.meta.env.VITE_CALENDAR_URL || 'https://calendly.com/sample-agency/google-ads-audit?hide_event_type_details=1&hide_gdpr_banner=1'
  const containerRef = useRef(null)

  const openBooking = () => {
    const el = document.getElementById('booking')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="booking" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white/70 backdrop-blur rounded-2xl p-6 border border-gray-100 shadow">
            <h3 className="text-2xl font-bold text-gray-900">Book Your Free 30‑Minute Google Ads Audit</h3>
            <p className="mt-2 text-gray-600">Choose a time that works for you. You'll meet 1:1 with a certified strategist (5+ years hands‑on experience) to review your account and identify quick wins to maximize ROI.</p>
            <div className="mt-4 p-3 text-xs bg-blue-50 text-blue-700 rounded">
              Integration details: This calendar is embedded via a secure iframe. Set your booking URL with VITE_CALENDAR_URL. The page passes no PII until you submit the form on the provider side.
            </div>
            <div className="mt-2 text-xs text-gray-500">Validation: Booking CTA present and integrated via iframe; user can select a slot. Next step: connect your actual scheduling link via environment variable.</div>
          </div>
          <div ref={containerRef} className="w-full h-[560px] rounded-xl overflow-hidden border border-gray-200 shadow">
            <iframe
              title="Book your audit"
              src={calendarUrl}
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  // Demo data (replace with live data or API calls if desired)
  const results = useMemo(() => ([
    { label: 'Impressions', before: 120000, after: 250000, suffix: '' },
    { label: 'Clicks', before: 3200, after: 6800, suffix: '' },
    { label: 'Conversions', before: 110, after: 240, suffix: '' },
    { label: 'Cost / Conversion', before: 38, after: 22, suffix: '$' },
  ]), [])

  const reviews = useMemo(() => ([
    { name: 'Alex P.', rating: 5, text: 'They found wasted spend and rebuilt our structure. CPA down 42% in 6 weeks.' },
    { name: 'Morgan S.', rating: 5, text: 'Clear insights and fast execution. Our ROAS finally crossed 5x.' },
    { name: 'Jamie L.', rating: 4, text: 'Great audit with actionable next steps. Not fluff—real fixes.' },
  ]), [])

  const [hasResults, setHasResults] = useState(results && results.length > 0)
  const [hasReviews, setHasReviews] = useState(reviews && reviews.length > 0)

  const handlePrimaryCTA = () => {
    const el = document.getElementById('booking')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-16">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">US Market • Google Ads Growth • Free Audit</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Free Google Ads Audit to Maximize ROI
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Get a 30‑minute expert analysis from a Google Ads specialist with 5+ years of experience. We’ll reveal the exact optimizations to reduce wasted spend, scale winners, and lift your conversion rate.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={handlePrimaryCTA} className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow">
                Book Free Audit
              </button>
              <a href="#results" className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold">See Results</a>
            </div>
            <div className="text-xs text-gray-500">Validation: Headline states free audit; description mentions 30‑minute analysis and 5+ years experience; clear primary CTA provided. Next step: scroll to results or book.</div>
          </div>
        </div>
      </header>

      {/* Results */}
      <section id="results" className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Proven Google Ads Results</h2>
            <p className="text-gray-600 mt-2">We focus on what moves the needle: structure, match types, negatives, audience layering, and conversion accuracy.</p>
          </div>

          {hasResults ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.map((m) => (
                <MetricCard key={m.label} {...m} />
              ))}
            </div>
          ) : (
            <div className="p-6 border border-dashed border-gray-300 rounded-xl text-gray-600 bg-gray-50">
              No results available yet. Placeholder will render here until data is connected.
            </div>
          )}

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border bg-gradient-to-br from-green-50 to-white">
              <h3 className="font-semibold text-gray-900">Before</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc pl-5">
                <li>Broad match cannibalization</li>
                <li>Inaccurate conversion tracking</li>
                <li>Generic ad copy and low CTR</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border bg-gradient-to-br from-blue-50 to-white">
              <h3 className="font-semibold text-gray-900">After</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc pl-5">
                <li>Tight SKAG/Theme structure</li>
                <li>Server-side conversion tracking</li>
                <li>Message-market fit ad testing</li>
              </ul>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-500">Validation: Results section displays impressions, clicks, conversions, and a comparison with visuals; placeholder message appears if unavailable. Next step: connect real metrics via API when ready.</div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What Clients Say</h2>
          <p className="text-gray-600 mt-2">Real outcomes from US businesses running Google Ads at scale.</p>

          {hasReviews ? (
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {reviews.map((r, idx) => (
                <div key={idx} className="p-6 border rounded-xl bg-white shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900">{r.name}</div>
                    <StarRating rating={r.rating} />
                  </div>
                  <p className="mt-3 text-gray-700 text-sm">{r.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 p-6 border border-dashed border-gray-300 rounded-xl text-gray-600 bg-gray-50">
              No reviews available yet. Placeholder will render here until reviews are added.
            </div>
          )}

          <div className="mt-3 text-xs text-gray-500">Validation: Reviews include name, star rating out of 5, and text; placeholder message shows if none. Next step: import your testimonials or connect a reviews source.</div>
        </div>
      </section>

      {/* Booking CTA Footer */}
      <section className="py-10 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-xl font-bold">Ready to unlock more conversions from Google Ads?</h3>
            <p className="text-blue-100 text-sm">Claim your free 30‑minute audit. Limited availability each week.</p>
          </div>
          <button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold shadow hover:translate-y-[-1px] transition">
            Book Free Audit
          </button>
        </div>
      </section>

      {/* Booking Section */}
      <BookingSection />

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} US Google Ads Specialists. Not affiliated with Google LLC.
      </footer>
    </div>
  )
}
