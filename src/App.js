import './App.css';
import { useState } from 'react'

const getImages = async query => {
  const url = "https://serverless-api.signalnerve.workers.dev"

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: { 'Content-type': 'application/json' }
  })

  return resp.json()
}

function App() {
  const [query, setQuery] = useState("")
  const [images, setImages] = useState([])

  const search = async () => {
    const results = await getImages(query)
    setImages(results)
  }

  const updateQuery = evt => setQuery(evt.target.value)

  return (
    <div className="App">
      <div class="form">
        <input id="query" type="text" onChange={updateQuery} placeholder="Search query" />
        <button onClick={search}>Search</button>
      </div>

      {images.map(image =>
        <a key={image.id} href={image.link} target="_blank">
          <img src={image.image} />
        </a>
      )}
    </div>
  );
}

export default App;
