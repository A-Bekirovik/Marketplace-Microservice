import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue text-banner-text p-5 text-center text-2xl">
        <nav className="flex justify-start gap-5">
          <Link
            to="/"
            className="text-banner-text text-3xl no-underline px-2 py-2 hover:text-gray-800 transition duration-300 ease-in-out"
          >
            Marketplace
          </Link>
          <Link
            to="/ProductCreate"
            className="text-banner-text text-lg no-underline px-4 py-2 bg-banner-button rounded hover:bg-blue transition duration-300 ease-in-out flex justify-center items-center"
          >
            Create
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-blue text-banner-text text-center p-2 z-50">
        <p>© 2024 My Online Store</p>
      </footer>
    </div>
  );
};

export default Layout;
