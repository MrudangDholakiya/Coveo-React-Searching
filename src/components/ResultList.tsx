import {useEffect, useState} from "react";
import {
  buildResultList,
  type ResultList as HeadlessResultList,
  type Result,
} from "@coveo/headless";
import {engine} from "../engine";

// Helper to safely extract string fields from raw
const getField = (r: Result, field: string): string | null => {
  const value = r.raw?.[field];
  return value ? String(value) : null;
};

export const ResultList = () => {
  const [controller] = useState<HeadlessResultList>(() => buildResultList(engine));
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState({...controller.state})), [controller]);

  return (
    <ul className="space-y-4">
      {state.results.map((r: Result) => {
        const author = getField(r, "author");
        const source = getField(r, "source");
        const filetype = getField(r, "filetype");
        const date = getField(r, "date");

        return (
          <li
            key={r.uniqueId}
            className="p-5 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            {/* Title */}
            <a
              href={r.clickUri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-indigo-700 hover:underline"
            >
              {r.title || "Untitled"}
            </a>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
              {author && <span>👤 {author}</span>}
              {source && (
                <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">
                  {source}
                </span>
              )}
              {filetype && (
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded">
                  {filetype.toUpperCase()}
                </span>
              )}
              {date && (
                <span>📅 {new Date(date).toLocaleDateString()}</span>
              )}
            </div>

            {/* Excerpt */}
            <p className="text-gray-600 mt-2">{r.excerpt}</p>

            {/* URI */}
            <div className="mt-2">
              <a
                href={r.clickUri}
                className="text-xs text-indigo-500 hover:underline break-words"
              >
                {r.clickUri}
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
