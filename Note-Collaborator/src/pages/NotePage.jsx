import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import NoteEditor from "../components/NoteEditor";
import ActivityPanel from "../components/ActivityPanel";

export default function NotePage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const saveTimeout = useRef(null);

  useEffect(() => {
    api.get(`/notes/${id}`).then((res) => setNote(res.data));
  }, [id]);

  // Title update (debounced)
  const handleTitleChange = (e) => {
    const value = e.target.value;

    setNote((prev) => {
      clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(() => {
        api.put(`/notes/${id}`, {
          title: value,
          content: prev.content,
        });
      }, 800);

      return { ...prev, title: value };
    });
  };

  // Share link
  const shareNote = async () => {
    try {
      const res = await api.post(`/notes/${note.id}/share`);
      const fullLink = window.location.origin + res.data.shareLink;

      await navigator.clipboard.writeText(fullLink);
      alert("Share link copied to clipboard!");
    } catch {
      alert("Failed to generate share link");
    }
  };

  if (!note) return <p className='p-6'>Loading...</p>;

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Top Bar */}
      <div className='sticky top-0 z-10 bg-white border-b'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
          {/* Title */}
          <input
            value={note.title}
            onChange={handleTitleChange}
            placeholder='Untitled Note'
            className='
            text-2xl font-semibold
            w-full max-w-2xl
            border-none outline-none
            focus:ring-0
            placeholder:text-gray-400
          '
          />

          {/* Actions */}
          <div className='flex items-center gap-3'>
            <button
              onClick={shareNote}
              className='
              px-4 py-2
              text-sm font-medium
              bg-gray-100
              rounded-lg
              hover:bg-gray-200
              transition
            '>
              🔗 Share
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-6 grid grid-cols-12 gap-6'>
        {/* Editor */}
        <div className='col-span-9'>
          <div className='bg-white rounded-2xl shadow-sm p-6'>
            <NoteEditor note={note} />
          </div>
        </div>

        {/* Activity Panel */}
        <div className='col-span-3'>
          <div className='bg-white rounded-2xl shadow-sm p-4 h-fit sticky top-24'>
            <ActivityPanel noteId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
