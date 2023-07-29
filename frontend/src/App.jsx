import { useEffect, useState } from 'react'
import './App.css'
import { parseSong, renderSong } from 'chord-mark/lib/chord-mark.js'

function App() {
  const [apiUrl, setApiUrl] = useState(import.meta.env.VITE_API_URL)
  // const [message, setMessage] = useState('')
  const [songs, setSongs] = useState([])
  const [uploadSong, setUploadSong] = useState('')
  const [name, setName] = useState('')

  const handleSubmitSong = async (e) => {
    e.preventDefault();
    const res = await fetch(apiUrl + '/songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, song: uploadSong })
    });
    const data = await res.json();
    const rawSong = data.song;
    const parsedSong = parseSong(rawSong);
    setSongs([...songs, parsedSong]);
    setUploadSong('');
    setName('');
  }

  useEffect(() => {
    ;( async () => { 
      const res = await fetch(apiUrl + '/songs');
      const data = await res.json();
      const rawSongs = data.songs;
      const parsedSongs = rawSongs.map(song => {
        return { ...song, chordmark: parseSong(song.chordmark)}
      });
      setSongs(parsedSongs);
    })();
  }, [])

  return (
    <>
    <div>
      <h2>Upload a song</h2>
      <form onSubmit={handleSubmitSong}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)}/>
        <label htmlFor='song'>Song</label>
        <textarea name="song" id="song" cols="30" rows="10" value={uploadSong} onChange={e => setUploadSong(e.target.value)}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
      <div>
        {songs.length && songs.map(song => {
          return (
            <div key={song.id}>
              <div>{song.name}</div>
              <div dangerouslySetInnerHTML={{ __html: renderSong(song.chordmark) }}></div>
            </div>
          )        
        })}
      </div>
    </>
  )
}

export default App
