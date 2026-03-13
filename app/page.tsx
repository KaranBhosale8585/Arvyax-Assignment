"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, Sparkles } from "lucide-react";

export default function JournalPage() {
  const [text, setText] = useState("");
  const [ambience, setAmbience] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const submitJournal = async () => {
    if (!text) {
      toast.error("Please write something");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/journal", {
        ambience,
        text,
      });

      setResult(res.data);
      setAmbience("");
      setText("");

      toast.success("Journal analyzed successfully");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold flex justify-center gap-2 items-center">
            <Sparkles className="text-indigo-500" />
            AI Journal Analyzer
          </h1>
          <p className="text-gray-500 mt-1">
            Write your thoughts and let AI analyze your emotions
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ambience</label>

            <textarea
              rows={1}
              value={ambience}
              onChange={(e) => setAmbience(e.target.value)}
              placeholder="Describe the ambience"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Your Journal
            </label>

            <textarea
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write about your day..."
              className="w-full border rounded-lg p-3 resize-none"
            />
          </div>

          <button
            onClick={submitJournal}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 flex justify-center items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            Analyze Journal
          </button>
        </div>

        {result && (
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold">AI Emotion Analysis</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Emotion</p>
                <p className="text-lg font-semibold text-indigo-700">
                  {result.emotion}
                </p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Ambience</p>
                <p className="text-lg font-semibold">{result.ambience}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Keywords</p>

              <div className="flex flex-wrap gap-2">
                {result.keywords?.map((k: string, i: number) => (
                  <span
                    key={i}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Summary</p>

              <p className="text-gray-700">{result.summary}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
