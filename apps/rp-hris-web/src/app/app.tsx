import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';
import { User } from '@rp-hris/shared';

export function App() {
  // Sample Usage of the User Context
  const user: User = {
    id: "1",
    name: "John Doe",
    email:"john@gmail.com"
  }
  return (
    <div>
      <NxWelcome title="@rp-hris/rp-hris-web" />
      {/* Sample Usage of the User Context */}
      <pre>{JSON.stringify(user, null , 2)}</pre>

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
