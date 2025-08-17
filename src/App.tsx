import {useEffect} from "react";
import {engine} from "./engine";
import {SearchBox} from "./components/SearchBox";
import {ResultList} from "./components/ResultList";
import {Facet} from "./components/Facet";
import {NumericFacet} from "./components/NumericFacet";
import {Pager} from "./components/Pager";
import {Tab} from "./components/Tab";

function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      engine.executeFirstSearch();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center sm:text-left w-full sm:w-auto">
            🔎 Coveo Searching
          </h1>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-center">
  <Tab id="all" expression="" label="All" />
  <Tab id="docs" expression='@filetype=="doc"' label="Docs" />
  <Tab id="pdfs" expression='@filetype=="pdf"' label="PDFs" />
</div>

        {/* Search Box */}
        <div className="w-full max-w-2xl mx-auto">
          <SearchBox />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Sidebar with facets */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow p-4">
              <Facet field="author" label="Author" />
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <Facet field="source" label="Source" />
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <NumericFacet field="size" label="File Size" />
            </div>
          </aside>

          {/* Results */}
          <section className="lg:col-span-3">
            <ResultList />
            <div className="mt-6 flex justify-center">
              <Pager />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
