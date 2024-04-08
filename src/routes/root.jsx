import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <h1>Root</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="projects">Projects</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
