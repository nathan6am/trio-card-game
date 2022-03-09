import CardGrid from "./components/CardGrid";

export default function App() {
  return (
    <>
      <div className="flex min-h-screen w-screen items-center justify-center bg-orange-100">
        <div className="container flex items-center justify-center">
          <div className="px-10 py-5">
            <CardGrid />
          </div>
        </div>
      </div>
    </>
  );
}
