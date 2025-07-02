import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <header className="text-4xl text-sky-300 font-bold p-10 w-full bg-zinc-700">
          <a href="/" target="_blank">
            Bento Tools
          </a>
        </header>
        <main className="w-full mb-auto bg-zinc-500">
          <div className="w-9/12 m-auto flex">
            <div className="text-white text-2xl p-4 border-2">
              hello I am a tool :)
            </div>
          </div>
        </main>
        <footer className="text-white text-right p-5 w-full bg-zinc-700">
          Created by <a href="https://www.github.com/tr1ptychs">tr1ptychs</a>
        </footer>
      </div>
    </>
  );
}

export default App;
