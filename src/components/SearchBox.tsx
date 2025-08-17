import {useEffect, useState} from "react";
import {buildSearchBox, type SearchBox as HeadlessSearchBox} from "@coveo/headless";
import {engine} from "../engine";
import {Search} from "lucide-react"; // icon library (lucide)

export const SearchBox = () => {
  const [controller] = useState<HeadlessSearchBox>(() => buildSearchBox(engine));
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState({...controller.state})), [controller]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        controller.submit();
      }}
      className="flex items-center gap-2 mb-6"
    >
      {/* Input wrapper with icon */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
          value={state.value}
          onChange={(e) => controller.updateText(e.target.value)}
          placeholder="Search documents..."
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full shadow transition"
      >
        Search
      </button>
    </form>
  );
};
