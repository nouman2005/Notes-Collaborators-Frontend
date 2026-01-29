import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ActivityPanel({ noteId }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get(`/active/${noteId}`).then((res) => setLogs(res.data));
  }, [noteId]);

  return (
    <div className='border p-3 h-[70vh] overflow-y-auto'>
      <h3 className='font-bold mb-3'>Activity</h3>

      {logs.length === 0 && (
        <p className='text-sm text-gray-500'>No activity yet</p>
      )}

      {logs.map((l) => (
        <p key={l.id} className='text-sm mb-1'>
          <span className='font-semibold'>{l.name}</span> {l.action}
        </p>
      ))}
    </div>
  );
}
