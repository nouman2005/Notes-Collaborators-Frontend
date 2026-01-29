import { useEffect, useRef, useState } from "react";
import socket from "../socket/socket";
import api from "../api/axios";

export default function NoteEditor({ note }) {
  const noteId = note?.id;

  // 🔥 init only once
  const [content, setContent] = useState(() => note?.content || "");
  const saveTimeout = useRef(null);
  const isLocalChange = useRef(false);

  // socket
  useEffect(() => {
    if (!noteId) return;

    socket.emit("join-note", noteId);

    const onReceive = (newContent) => {
      if (!isLocalChange.current) {
        setContent(newContent);
      }
      isLocalChange.current = false;
    };

    socket.on("receive-update", onReceive);

    return () => socket.off("receive-update", onReceive);
  }, [noteId]);

  const handleChange = (e) => {
    const value = e.target.value;
    isLocalChange.current = true;

    setContent(value);

    socket.emit("note-update", {
      noteId,
      content: value,
    });

    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      api.put(`/notes/${noteId}`, { content: value });
    }, 800);
  };

  return (
    <div className='relative'>
      {/* Editor container */}
      <div className='rounded-xl border bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition'>
        <textarea
          value={content}
          onChange={handleChange}
          placeholder='Start typing your notes here...'
          className='
          w-full
          h-[70vh]
          resize-none
          rounded-xl
          bg-transparent
          p-6
          text-[16px]
          leading-relaxed
          text-gray-800
          placeholder:text-gray-400
          outline-none
        '
        />
      </div>

      {/* Footer hint */}
      <div className='mt-2 text-xs text-gray-400 flex justify-between'>
        <span>Autosaved • Real-time collaboration</span>
        <span>Markdown friendly</span>
      </div>
    </div>
  );
}
