import {useEffect, useState} from "react";
import {buildPager, type Pager as HeadlessPager} from "@coveo/headless";
import {engine} from "../engine";

export const Pager = () => {
  const [controller] = useState<HeadlessPager>(() =>
    buildPager(engine, {options: {numberOfPages: 5}})
  );
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState({...controller.state})), [controller]);

  return (
    <nav className="flex items-center gap-2">
      {/* Previous button */}
      <button
        className={`px-3 py-1 rounded-md border text-sm transition ${
          state.hasPreviousPage
            ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        disabled={!state.hasPreviousPage}
        onClick={() => controller.previousPage()}
      >
        ‹ Prev
      </button>

      {/* Page numbers */}
      {state.currentPages.map((page) => (
        <button
          key={page}
          onClick={() => controller.selectPage(page)}
          className={`px-3 py-1 rounded-md border text-sm transition ${
            page === state.currentPage
              ? "bg-indigo-600 border-indigo-600 text-white font-semibold"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      <button
        className={`px-3 py-1 rounded-md border text-sm transition ${
          state.hasNextPage
            ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        disabled={!state.hasNextPage}
        onClick={() => controller.nextPage()}
      >
        Next ›
      </button>
    </nav>
  );
};
