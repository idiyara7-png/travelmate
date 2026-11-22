import { useEffect, useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useParams } from 'react-router-dom'
import './App.css'

/* ---------- Icons ---------- */
const ICONS = {
  plane: <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />,
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></>),
  cap: (<><path d="M22 10 12 5 2 10l10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>),
  spark: <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />,
  shield: (<><path d="M20 13c0 5-3.5 7.5-7.7 8.9a1 1 0 0 1-.7 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.5 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>),
  globe: (<><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>),
  headphones: <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />,
  camera: (<><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></>),
  compass: (<><circle cx="12" cy="12" r="10" /><path d="M16 8l-2 6-6 2 2-6z" /></>),
  trophy: <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
}

function Icon({ name, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

/* ---------- Avatar ---------- */
const AVATAR_COLORS = ['#38bdd4', '#0e7490', '#7dd3fc', '#a78bfa', '#fb923c', '#34d399']
const FACES = ['smile', 'cool', 'wink', 'calm']

function Face({ face }) {
  const s = { stroke: '#3b2a20', strokeWidth: 3, strokeLinecap: 'round', fill: 'none' }
  if (face === 'cool') return (<><path d="M31 52h12M57 52h12" {...s} /><path d="M41 68h18" {...s} /></>)
  if (face === 'wink') return (<><circle cx="38" cy="52" r="3.5" fill="#3b2a20" /><path d="M57 52q5-5 10 0" {...s} /><path d="M38 65q12 12 24 0" {...s} /></>)
  if (face === 'calm') return (<><path d="M33 53q5-5 10 0M57 53q5-5 10 0" {...s} /><path d="M42 67q8 4 16 0" {...s} /></>)
  return (<><circle cx="38" cy="52" r="3.5" fill="#3b2a20" /><circle cx="62" cy="52" r="3.5" fill="#3b2a20" /><path d="M38 65q12 12 24 0" {...s} /></>)
}

function Avatar({ color, face, glasses, size = 96 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Avatar">
      <circle cx="50" cy="50" r="50" fill={color} />
      <circle cx="50" cy="56" r="30" fill="#ffe2c6" />
      <path d="M20 54C20 20 80 20 80 54C70 36 30 36 20 54Z" fill="#3b2a20" />
      <Face face={face} />
      {glasses && (
        <g fill="none" stroke="#0c2433" strokeWidth="2.5">
          <circle cx="38" cy="52" r="9" />
          <circle cx="62" cy="52" r="9" />
          <path d="M47 52h6" />
        </g>
      )}
    </svg>
  )
}

/* ---------- Data ---------- */
const SECTIONS = [
  { id: 'account', title: 'My Account', icon: 'user', path: '/account', text: 'Your profile, latest search, points and trip history.' },
  { id: 'search', title: 'Travel Search', icon: 'plane', path: '/search', text: 'One way, round trip or multi-city, with dates and passengers.' },
  { id: 'student', title: 'Student Benefits', icon: 'cap', path: '/student', text: 'Airlines with student fares and extra baggage.' },
  { id: 'planner', title: 'AI Planner', icon: 'spark', text: 'A full trip plan built from your dates, budget and interests.',
    features: ['Destination Finder by budget and interests', 'Day-by-day itinerary', 'Budget Planner', 'Hotel and flight suggestions', 'Interactive map of the route', 'AI chat to change the plan', 'Plan B for bad weather', 'Group planning with friends', 'Save to My Trips'] },
  { id: 'visa', title: 'Visa Assistant', icon: 'shield', text: 'Visa rules for your passport and destination.',
    features: ['Requirements by citizenship and destination', 'Visa-free entry information', 'Document checklist', 'How and where to apply (official sites)', 'Cost and processing time', 'Length of stay rules', 'Expiry reminders', 'Documents saved in Travel Wallet'] },
  { id: 'map', title: 'My Travel Map', icon: 'globe', text: 'Visited and planned countries, cities and places.',
    features: ['World map of visited countries', 'Planned places', 'Country, city, place and status (for example Malaysia, Kuala Lumpur, Visited)'] },
  { id: 'polyglot', title: 'PolyGlot Guide', icon: 'headphones', text: 'Understand your tour guide in real time.',
    features: ['Real-time translation of the guide', 'Subtitles', 'Audio in your chosen language', 'Group joins by QR code'] },
  { id: 'memories', title: 'Travel Memories', icon: 'camera', text: 'Reviews, photos, short videos and a travel diary.',
    features: ['Reviews and ratings', 'Photos and short videos', 'Comments', 'Personal travel diary'] },
  { id: 'tools', title: 'Travel Tools', icon: 'compass', text: 'Flight tracker, packing list, safety and local guide.',
    features: ['Smart Flight Tracker: status, gate changes, delays, reminders', 'Smart Packing List by weather and trip length', 'Travel Safety: emergency numbers, embassies, hospitals, SOS', 'Currency converter, local payments, useful phrases, tipping and customs'] },
  { id: 'passport', title: 'Challenges and Passport', icon: 'trophy', text: 'Travel challenges and your digital travel passport.',
    features: ['Challenges such as visit 5 countries or try local food', 'Digital Travel Passport with achievements'] },
]

const AIRLINES = [
  { name: 'Lufthansa Group', url: 'https://www.lufthansa.com', note: 'Student and youth fares on selected routes.' },
  { name: 'Turkish Airlines', url: 'https://www.turkishairlines.com', note: 'Student offers such as extra baggage or fare discounts.' },
  { name: 'Qatar Airways', url: 'https://www.qatarairways.com', note: 'Student offers on selected routes and dates.' },
  { name: 'Emirates', url: 'https://www.emirates.com', note: 'Student offers and extra baggage on some routes.' },
  { name: 'KLM', url: 'https://www.klm.com', note: 'Youth and student fares for eligible travellers.' },
  { name: 'Singapore Airlines', url: 'https://www.singaporeair.com', note: 'Student offers on selected routes.' },
]

const TRIP_TYPES = { one: 'One way', round: 'Round trip', multi: 'Multi-city' }

function loadStored(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

/* ---------- Layout ---------- */
function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />
    </div>
  )
}

function Shell({ user, children }) {
  return (
    <div className="page">
      <Background />
      <header className="header">
        <Link to="/" className="logo">
          <span className="logo-mark"><Icon name="plane" size={18} /></span>
          TravelMate
        </Link>
        <nav className="nav">
          <NavLink to="/" end className="nav-link">Home</NavLink>
          <NavLink to="/search" className="nav-link">Search</NavLink>
          <NavLink to="/student" className="nav-link">Student</NavLink>
          <NavLink to="/account" className="avatar-link" aria-label="My account">
            <Avatar {...user.avatar} size={36} />
          </NavLink>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="footer">TravelMate. Demo project, data is for illustration only.</footer>
    </div>
  )
}

/* ---------- Pages ---------- */
function Welcome({ onDone }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState({ color: AVATAR_COLORS[0], face: 'smile', glasses: false })

  function submit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onDone({ name: name.trim(), email: email.trim(), avatar })
  }

  return (
    <div className="page">
      <Background />
      <div className="container narrow">
        <p className="eyebrow">Welcome to TravelMate</p>
        <h1 className="page-title">Create your profile</h1>
        <form className="panel" onSubmit={submit}>
          <div className="avatar-preview">
            <Avatar {...avatar} size={120} />
          </div>

          <div className="field">
            <span className="label">Colour</span>
            <div className="swatches">
              {AVATAR_COLORS.map((c) => (
                <button key={c} type="button" className={avatar.color === c ? 'swatch active' : 'swatch'} style={{ background: c }} onClick={() => setAvatar({ ...avatar, color: c })} aria-label={`Colour ${c}`} />
              ))}
            </div>
          </div>

          <div className="field">
            <span className="label">Face</span>
            <div className="segments">
              {FACES.map((f) => (
                <button key={f} type="button" className={avatar.face === f ? 'seg active' : 'seg'} onClick={() => setAvatar({ ...avatar, face: f })}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <label className="check">
            <input type="checkbox" checked={avatar.glasses} onChange={(e) => setAvatar({ ...avatar, glasses: e.target.checked })} />
            <span>Glasses</span>
          </label>

          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>

          <button type="submit" className="cta">Create my profile <Icon name="arrow" size={18} /></button>
          <p className="note">Demo profile: saved only in this browser, no password yet. Real accounts come with the backend.</p>
        </form>
      </div>
    </div>
  )
}

function Home({ user }) {
  return (
    <div className="container">
      <p className="eyebrow">Welcome</p>
      <h1 className="page-title">Hi, {user.name}. Where to next?</h1>
      <div className="tiles">
        {SECTIONS.map((s) => (
          <Link key={s.id} to={s.path || `/soon/${s.id}`} className="tile">
            <span className="tile-icon"><Icon name={s.icon} /></span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <span className={s.path ? 'chip ok' : 'chip'}>{s.path ? 'Available' : 'Planned'}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function Account({ user, onSignOut }) {
  const latest = loadStored('tm-searches', [])[0]
  const planned = ['Trip history', 'Trip locator for your next flight', 'Points and levels', 'Visa expiry reminders', 'Saved documents (Travel Wallet)', 'Achievements and digital passport']

  return (
    <div className="container">
      <div className="panel profile-head">
        <Avatar {...user.avatar} size={96} />
        <div>
          <h1 className="page-title small">{user.name}</h1>
          <p className="muted">{user.email || 'No email added'}</p>
        </div>
      </div>

      <div className="stats">
        <div className="panel stat"><strong>0</strong><span>Flights</span></div>
        <div className="panel stat"><strong>0</strong><span>Countries visited</span></div>
        <div className="panel stat"><strong>0</strong><span>Points</span></div>
      </div>

      <div className="panel">
        <h3>Latest search</h3>
        {latest ? (
          <p className="muted">
            {latest.legs.map((l) => `${l.from} to ${l.to}`).join(', ')} · {latest.passengers} passenger{latest.passengers > 1 ? 's' : ''}
          </p>
        ) : (
          <p className="muted">No searches yet. Try Travel Search.</p>
        )}
      </div>

      <div className="panel">
        <h3>Coming to your account</h3>
        <ul className="list">
          {planned.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>

      <button type="button" className="seg" onClick={onSignOut}>Sign out</button>
    </div>
  )
}

function Search() {
  const emptyLeg = { from: '', to: '', date: '' }
  const [type, setType] = useState('round')
  const [legs, setLegs] = useState([{ ...emptyLeg }])
  const [ret, setRet] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [student, setStudent] = useState(true)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(() => loadStored('tm-searches', []))

  useEffect(() => {
    try {
      localStorage.setItem('tm-searches', JSON.stringify(saved))
    } catch {
      /* storage not available */
    }
  }, [saved])

  function chooseType(t) {
    setType(t)
    setLegs((prev) => (t === 'multi' ? (prev.length >= 2 ? prev : [...prev, { ...emptyLeg }]) : [prev[0]]))
  }

  function updateLeg(i, field, value) {
    setLegs((prev) => prev.map((l, idx) => (idx === i ? { ...l, [field]: value } : l)))
  }

  function submit(e) {
    e.preventDefault()
    if (legs.some((l) => !l.from.trim() || !l.to.trim())) {
      setError('Please fill in From and To for every flight.')
      return
    }
    if (type === 'round' && ret && legs[0].date && ret < legs[0].date) {
      setError('Return date cannot be earlier than the departure date.')
      return
    }
    setError('')
    setSaved((prev) => [{ id: Date.now(), type, legs, ret: type === 'round' ? ret : '', passengers, student }, ...prev].slice(0, 20))
  }

  return (
    <div className="container">
      <h1 className="page-title">Travel Search</h1>
      <form className="panel" onSubmit={submit}>
        <div className="segments">
          {Object.entries(TRIP_TYPES).map(([key, label]) => (
            <button key={key} type="button" className={type === key ? 'seg active' : 'seg'} onClick={() => chooseType(key)}>
              {label}
            </button>
          ))}
        </div>

        {legs.map((leg, i) => (
          <div className="leg" key={i}>
            <div className="field">
              <label htmlFor={`from${i}`}>From</label>
              <input id={`from${i}`} type="text" placeholder="City or airport" value={leg.from} onChange={(e) => updateLeg(i, 'from', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor={`to${i}`}>To</label>
              <input id={`to${i}`} type="text" placeholder="City or airport" value={leg.to} onChange={(e) => updateLeg(i, 'to', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor={`date${i}`}>Departure</label>
              <input id={`date${i}`} type="date" value={leg.date} onChange={(e) => updateLeg(i, 'date', e.target.value)} />
            </div>
            {type === 'multi' && legs.length > 2 && (
              <button type="button" className="link-btn" onClick={() => setLegs((prev) => prev.filter((_, idx) => idx !== i))}>Remove</button>
            )}
          </div>
        ))}

        {type === 'multi' && legs.length < 5 && (
          <button type="button" className="link-btn" onClick={() => setLegs((prev) => [...prev, { ...emptyLeg }])}>+ Add another flight</button>
        )}

        {type === 'round' && (
          <div className="field">
            <label htmlFor="ret">Return</label>
            <input id="ret" type="date" value={ret} onChange={(e) => setRet(e.target.value)} />
          </div>
        )}

        <div className="row">
          <div className="field">
            <span className="label">Passengers</span>
            <div className="stepper">
              <button type="button" onClick={() => setPassengers((p) => Math.max(1, p - 1))} aria-label="Fewer passengers">-</button>
              <strong>{passengers}</strong>
              <button type="button" onClick={() => setPassengers((p) => Math.min(9, p + 1))} aria-label="More passengers">+</button>
            </div>
          </div>
          <label className="check">
            <input type="checkbox" checked={student} onChange={(e) => setStudent(e.target.checked)} />
            <span>Student fare</span>
          </label>
        </div>

        <button type="submit" className="cta">Search flights <Icon name="arrow" size={18} /></button>
        {error && <p className="error">{error}</p>}
        <p className="note">Demo search: live prices will appear when the backend is connected. Searches are saved below.</p>
      </form>

      <div className="tiles">
        {saved.map((s) => (
          <article className="panel" key={s.id}>
            <h3>{s.legs.map((l) => `${l.from} to ${l.to}`).join(', ')}</h3>
            <p className="muted">
              {TRIP_TYPES[s.type]} · {s.legs[0].date || 'Flexible dates'}{s.ret ? ` to ${s.ret}` : ''} · {s.passengers} passenger{s.passengers > 1 ? 's' : ''}{s.student ? ' · Student fare' : ''}
            </p>
            <button type="button" className="link-btn" onClick={() => setSaved((prev) => prev.filter((x) => x.id !== s.id))}>Remove</button>
          </article>
        ))}
      </div>
    </div>
  )
}

function Student() {
  return (
    <div className="container">
      <h1 className="page-title">Student Benefits</h1>
      <p className="muted lead">Airlines that offer student fares or perks. Conditions depend on route, country and dates, so always confirm on the official site and keep your student ID ready.</p>
      <div className="tiles">
        {AIRLINES.map((a) => (
          <a key={a.name} className="tile" href={a.url} target="_blank" rel="noopener noreferrer">
            <span className="tile-icon"><Icon name="cap" /></span>
            <h3>{a.name}</h3>
            <p>{a.note}</p>
            <span className="chip ok">Open official site</span>
          </a>
        ))}
      </div>
    </div>
  )
}

function Soon() {
  const { id } = useParams()
  const s = SECTIONS.find((x) => x.id === id && !x.path)
  if (!s) return <Navigate to="/" replace />
  return (
    <div className="container narrow">
      <span className="tile-icon big"><Icon name={s.icon} size={30} /></span>
      <h1 className="page-title">{s.title}</h1>
      <p className="muted lead">{s.text}</p>
      <div className="panel">
        <h3>Planned features</h3>
        <ul className="list">
          {s.features.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
      <Link to="/" className="seg">Back to home</Link>
    </div>
  )
}

/* ---------- App ---------- */
function App() {
  const [user, setUser] = useState(() => loadStored('tm-user', null))

  useEffect(() => {
    try {
      if (user) localStorage.setItem('tm-user', JSON.stringify(user))
      else localStorage.removeItem('tm-user')
    } catch {
      /* storage not available */
    }
  }, [user])

  if (!user) return <Welcome onDone={setUser} />

  return (
    <Shell user={user}>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/account" element={<Account user={user} onSignOut={() => setUser(null)} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/student" element={<Student />} />
        <Route path="/soon/:id" element={<Soon />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  )
}

export default App
