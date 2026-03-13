"use client";

import { useEffect, useState } from "react";
import { BookOpen, Smile, Leaf, CalendarDays } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast/headless";

export default function JournalHistory() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const getLogs = async () => {
    try {
      const res = await axios.get("/api/history");

      setLogs(res.data.journalLogs || []);
    } catch (error) {
      toast.error("Error fetching journals:");
    } finally {
      setLoading(false);
    }
  };

  getLogs();
}, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading Journals...
      </div>
    );

  return (
    <div className="min-h-screen text-gray-700 bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            My Journal Insights
          </h1>
          <p className="text-gray-500">
            Your personal journal entries analyzed by AI
          </p>
        </div>

        {logs.length === 0 && (
          <p className="text-gray-500">No journal entries yet.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logs.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-indigo-100">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 line-clamp-1">
                    Journal Entry
                  </h3>

                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {item.text}
              </p>

              <div className="flex items-center gap-2 text-sm mb-2">
                <Smile className="w-4 h-4 text-yellow-500" />
                <span>
                  <b>Emotion:</b> {item.emotion}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm mb-3">
                <Leaf className="w-4 h-4 text-green-500" />
                <span>
                  <b>Ambience:</b> {item.ambience}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {item.keywords?.map((k: string, i: number) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-xs px-2 py-1 rounded"
                  >
                    {k}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-600 border-t pt-3">
                <b>Summary:</b> {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
