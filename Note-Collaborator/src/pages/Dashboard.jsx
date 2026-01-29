import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Plus } from "lucide-react";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  // Fetch notes
  useEffect(() => {
    api
      .get("/notes")
      .then((res) => setNotes(res.data))
      .catch(() => {
        // token invalid → force logout
        handleLogout();
      });
  }, []);

  // Create note
  const createNote = async () => {
    const { data } = await api.post("/notes", {
      title: "Untitled Note",
      content: "",
    });

    navigate(`/notes/${data.noteId}`);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* HEADER */}
      <header className='flex items-center justify-between px-8 py-4 bg-white shadow-sm'>
        <h1 className='text-2xl font-bold text-gray-800'>📝 My Notes</h1>

        <div className='flex items-center gap-4'>
          <button
            onClick={createNote}
            className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'>
            <Plus size={18} />
            New Note
          </button>

          <button
            onClick={handleLogout}
            className='flex items-center gap-2 text-gray-600 hover:text-red-600 transition'>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className='p-8'>
        {notes.length === 0 ? (
          <div className='flex flex-col items-center justify-center text-gray-500 mt-20'>
            <p className='text-lg mb-4'>No notes yet</p>
            <button
              onClick={createNote}
              className='bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition'>
              Create your first note
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((n) => (
              <Link
                to={`/notes/${n.id}`}
                key={n.id}
                className='group bg-white p-5 rounded-xl border hover:shadow-lg transition'>
                <h3 className='font-semibold text-lg text-gray-800 mb-2 group-hover:text-blue-600'>
                  {n.title || "Untitled Note"}
                </h3>

                <p className='text-sm text-gray-500'>Last updated</p>
                <p className='text-sm text-gray-600'>
                  {new Date(n.updated_at).toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
