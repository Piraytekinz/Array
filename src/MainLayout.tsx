import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div>
      {/* Common header, nav, etc. */}
      <header>My App Header</header>

      {/* This renders the matched child route */}
      <Outlet />
    </div>
  );
}
