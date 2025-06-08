import Dashboard from "./Dashboard";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full shadow-md bg-white z-50">
        <Navbar />
      </header>
      \{" "}
      <main className="flex flex-1 flex-col pt-20">
        <section className="bg-white shadow rounded-lg">
          <Dashboard />
        </section>

        {/* <section className="bg-white shadow rounded-lg"></section>

          <section className="bg-white shadow rounded-lg"></section> */}
      </main>
      <footer className="bg-gray-100 text-center shadow-inner mt-4">
        <Footer />
      </footer>
    </>
  );
};

export default Home;
