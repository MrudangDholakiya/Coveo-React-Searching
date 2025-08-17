import {useEffect, useState} from "react";
import {buildTab, type Tab as HeadlessTab} from "@coveo/headless";
import {engine} from "../engine";

export const Tab = ({id, expression, label}: {id: string; expression: string; label: string}) => {
  const [controller] = useState<HeadlessTab>(() =>
    buildTab(engine, {options: {id, expression}})
  );
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState({...controller.state})), [controller]);

  return (
    <button
      onClick={() => controller.select()}
      className={`px-4 py-2 rounded-full text-sm font-medium transition 
        ${
          state.isActive
            ? "bg-indigo-600 text-white shadow"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
    >
      {label}
    </button>
  );
};
