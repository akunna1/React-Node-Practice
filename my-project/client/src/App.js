import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  // Fetch notes on load
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  // Add new note
  const addNote = async () => {
    if (!text.trim()) return;
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);
    setText('');
  };

  // Update note text
  const updateNote = async (id, newText) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText })
    });
    setNotes(notes.map(note =>
      note.id === id ? { ...note, text: newText } : note
    ));
  };

  // Delete a note
  const deleteNote = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">📝 Simple Notes App</h1>

      <div className="flex gap-2 mb-4 w-full max-w-md">
        <input
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Enter a note"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
          onClick={addNote}
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-4">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex items-center justify-between bg-white p-4 rounded-md shadow"
          >
            <input
              defaultValue={note.text}
              className="flex-1 mr-2 border-b border-gray-300 focus:outline-none focus:border-purple-500"
              onBlur={(e) => updateNote(note.id, e.target.value)}
            />
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
