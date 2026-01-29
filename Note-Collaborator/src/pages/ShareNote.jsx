import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ShareNote() {
  const { token } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/notes/share/${token}`)
      .then((res) => setNote(res.data))
      .catch(() => setError("Invalid or expired share link"));
  }, [token]);

  if (error) {
    return (
      <div className='h-screen flex items-center justify-center text-gray-500'>
        {error}
      </div>
    );
  }

  if (!note) {
    return (
      <div className='h-screen flex items-center justify-center'>
        Loading...
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-8 flex justify-center'>
      <div className='bg-white max-w-3xl w-full p-6 rounded shadow'>
        <h1 className='text-2xl font-bold mb-4'>
          {note.title || "Untitled Note"}
        </h1>

        <pre className='whitespace-pre-wrap text-gray-800'>{note.content}</pre>

        <p className='text-xs text-gray-400 mt-6'>Shared via Notes App</p>
      </div>
    </div>
  );
}
