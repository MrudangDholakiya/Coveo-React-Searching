import {useEffect, useState} from "react";
import {buildFacet, type Facet as HeadlessFacet} from "@coveo/headless";
import {engine} from "../engine";

export const Facet = ({field, label}: {field: string; label: string}) => {
  const [controller] = useState<HeadlessFacet>(() =>
    buildFacet(engine, {options: {field}})
  );
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState({...controller.state})), [controller]);

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      {/* Facet title */}
      <h3 className="font-semibold text-gray-800 border-b pb-2 mb-3">{label}</h3>

      {/* Values */}
      <ul className="space-y-2">
        {state.values.map((v) => (
          <li key={v.value}>
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  checked={v.state === "selected"}
                  onChange={() => controller.toggleSelect(v)}
                />
                <span className="text-gray-700">{v.value}</span>
              </div>
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
