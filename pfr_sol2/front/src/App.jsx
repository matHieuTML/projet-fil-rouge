
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import Main from './components/Main';
import Films from './components/Films';
import Onefilm from './components/Onefilm';
import Profil from './components/Profil';
import Events from './components/Events';
import Mentions from './components/Mentions';

// Composant pour la page 404
const NotFound = () => (
  <div>
    <h2>404 - Page Not Found</h2>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link to="/">Go back to the homepage</Link>
  </div>
);

// Composant pour la page 403
const Forbidden = () => (
  <div>
    <h2>403 - Forbidden</h2>
    <p>Sorry, you don't have permission to access this page.</p>
    <Link to="/">Go back to the homepage</Link>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Main />
      </div>
    ),
    children: [
      {
        index: true,
        element: (
          <main>
            <Films />
          </main>
        ),
      },
      {
        path: 'pagefilm/:_id',
        element: (
          <main>
            <Onefilm />
          </main>
        ),
      },
      {
        path: 'profil',
        element: (
          <main>
            <Profil />
          </main>
        ),
      },
      {
        path: 'events',
        element: (
          <main>
            <Events />
          </main>
        ),
      },
      {
        path: 'mentions-legales',
        element: (
          <main>
            <Mentions />
          </main>
        ),
      }
    ],
  },
  // Déclaration de la route pour la page 404
  {
    path: '*', // Toutes les routes non déclarées précédemment
    element: <NotFound />
  },
  // Déclaration de la route pour la page 403
  {
    path: '/forbidden', // Route spécifique pour l'erreur 403
    element: <Forbidden />
  }
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App;
