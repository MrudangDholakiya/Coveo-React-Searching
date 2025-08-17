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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">🔎 Coveo Searching</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Tab id="all" expression="" label="All" />
          <Tab id="docs" expression='@filetype=="doc"' label="Docs" />
          <Tab id="pdfs" expression='@filetype=="pdf"' label="PDFs" />
        </div>

        {/* Search Box */}
        <SearchBox />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          {/* Sidebar with facets */}
          <aside className="md:col-span-1 space-y-6">
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
          <section className="md:col-span-3">
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
