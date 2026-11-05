import { useState } from 'react'

function App() {
  const [nev, setNev] = useState('')
  const [loginnev, setLoginnev] = useState('')
  const [jelszo, setJelszo] = useState('')
  const [szerepkor, setSzerepkor] = useState('felhasznalo')
  const [auto, setAuto] = useState(true)
  const [pc, setPc] = useState(true)
  const [mobil, setMobil] = useState('')
  const [email, setEmail] = useState('')

  const [hibak, setHibak] = useState({})
  const [uzenet, setUzenet] = useState('')

  function ellenorzes() {
    let ujHibak = {}

    const nevRegex = /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű ]+$/
    const loginRegex = /^[A-Za-z0-9]+$/
    const mobilRegex = /^[0-9+\/-]+$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!nevRegex.test(nev)) {
      ujHibak.nev = 'A név csak betűket és szóközt tartalmazhat!'
    }

    if (!loginRegex.test(loginnev)) {
      ujHibak.loginnev = 'A login név csak betűket és számokat tartalmazhat!'
    }

    if (jelszo.length < 5 || jelszo.length > 25) {
      ujHibak.jelszo = 'A jelszó 5 és 25 karakter között legyen!'
    }

    if (!mobilRegex.test(mobil)) {
      ujHibak.mobil = 'A mobil csak számokat és +, /, - jeleket tartalmazhat!'
    }

    if (!emailRegex.test(email)) {
      ujHibak.email = 'Hibás e-mail cím!'
    }

    setHibak(ujHibak)

    return Object.keys(ujHibak).length === 0
  }

  async function kuldes(e) {
    e.preventDefault()

    setUzenet('')

    if (!ellenorzes()) {
      return
    }

    try {
      const valasz = await fetch('http://localhost/kisprojekt/mentes.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nev: nev,
          loginnev: loginnev,
          jelszo: jelszo,
          szerepkor: szerepkor,
          auto: auto,
          pc: pc,
          mobil: mobil,
          email: email
        })
      })

      const adat = await valasz.json()

      if (adat.siker) {
        setUzenet(adat.uzenet)
        torles()
      } else {
        setUzenet(adat.uzenet)
      }
    } catch {
      setUzenet('Hiba történt a szerverhez való kapcsolódáskor!')
    }
  }

  function torles() {
    setNev('')
    setLoginnev('')
    setJelszo('')
    setSzerepkor('felhasznalo')
    setAuto(true)
    setPc(true)
    setMobil('')
    setEmail('')
    setHibak({})
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-7">

          <div className="card shadow">
            <div className="card-body p-4">

              <h1 className="text-center mb-4">
                Regisztráció
              </h1>

              <form onSubmit={kuldes}>

                <div className="mb-3">
                  <label className="form-label">
                    Név
                  </label>

                  <input
                    type="text"
                    className={`form-control ${hibak.nev ? 'is-invalid' : ''}`}
                    value={nev}
                    onChange={(e) => setNev(e.target.value)}
                  />

                  {hibak.nev && (
                    <div className="invalid-feedback">
                      {hibak.nev}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Login név
                  </label>

                  <input
                    type="text"
                    className={`form-control ${hibak.loginnev ? 'is-invalid' : ''}`}
                    value={loginnev}
                    onChange={(e) => setLoginnev(e.target.value)}
                  />

                  {hibak.loginnev && (
                    <div className="invalid-feedback">
                      {hibak.loginnev}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Jelszó
                  </label>

                  <input
                    type="password"
                    className={`form-control ${hibak.jelszo ? 'is-invalid' : ''}`}
                    value={jelszo}
                    onChange={(e) => setJelszo(e.target.value)}
                  />

                  {hibak.jelszo && (
                    <div className="invalid-feedback">
                      {hibak.jelszo}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Szerepkör
                  </label>

                  <select
                    className="form-select"
                    value={szerepkor}
                    onChange={(e) => setSzerepkor(e.target.value)}
                  >
                    <option value="felhasznalo">Felhasználó</option>
                    <option value="admin">Admin</option>
                    <option value="karbantarto">Karbantartó</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label d-block">
                    Autó
                  </label>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="auto"
                      checked={auto === true}
                      onChange={() => setAuto(true)}
                    />

                    <label className="form-check-label">
                      Van
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="auto"
                      checked={auto === false}
                      onChange={() => setAuto(false)}
                    />

                    <label className="form-check-label">
                      Nincs
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label d-block">
                    PC
                  </label>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="pc"
                      checked={pc === true}
                      onChange={() => setPc(true)}
                    />

                    <label className="form-check-label">
                      Van
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="pc"
                      checked={pc === false}
                      onChange={() => setPc(false)}
                    />

                    <label className="form-check-label">
                      Nincs
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Mobil
                  </label>

                  <input
                    type="text"
                    className={`form-control ${hibak.mobil ? 'is-invalid' : ''}`}
                    value={mobil}
                    onChange={(e) => setMobil(e.target.value)}
                  />

                  {hibak.mobil && (
                    <div className="invalid-feedback">
                      {hibak.mobil}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    E-mail
                  </label>

                  <input
                    type="email"
                    className={`form-control ${hibak.email ? 'is-invalid' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {hibak.email && (
                    <div className="invalid-feedback">
                      {hibak.email}
                    </div>
                  )}
                </div>

                <div className="d-flex gap-2 mt-4">

                  <button
                    type="submit"
                    className="btn btn-primary flex-fill"
                  >
                    Küldés
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary flex-fill"
                    onClick={torles}
                  >
                    Mégsem
                  </button>

                </div>

              </form>

              {uzenet && (
                <div className="alert alert-info mt-3">
                  {uzenet}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App