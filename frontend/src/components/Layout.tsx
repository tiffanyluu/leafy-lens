import { Outlet, NavLink } from "react-router-dom";
import { Suspense } from "react";

const Layout = () => {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/identify">Identify</NavLink>
        <NavLink to="/scans">Scan History</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </nav>

      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </main>

      <footer>&copy; {new Date().getFullYear()} LeafyLens</footer>
    </div>
  );
};

export default Layout;
