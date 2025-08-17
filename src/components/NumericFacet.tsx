import {useEffect, useState} from "react";
import {
  buildNumericFacet,
  type NumericFacet as HeadlessNumericFacet,
} from "@coveo/headless";
import {engine} from "../engine";

export const NumericFacet = ({field, label}: {field: string; label: string}) => {
  const [controller] = useState<HeadlessNumericFacet>(() =>
    buildNumericFacet(engine, {
      options: {
        field,
        generateAutomaticRanges: true,
      },
    })
  );
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState({...controller.state})), [controller]);

  // Helper: pretty-print range
  const formatRange = (start: number, end: number) => {
    if (end === Number.MAX_VALUE) return `>${start.toLocaleString()}`;
    return `${start.toLocaleString()} – ${end.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      {/* Facet header */}
      <h3 className="font-semibold text-gray-800 border-b pb-2 mb-3">{label}</h3>

      {/* Facet values */}
      <ul className="space-y-2">
        {state.values.map((v) => (
          <li key={v.start}>
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  checked={v.state === "selected"}
                  onChange={() => controller.toggleSelect(v)}
                />
                <span className="text-gray-700">{formatRange(v.start, v.end)}</span>
              </div>

              {/* Count badge */}
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {v.numberOfResults}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
