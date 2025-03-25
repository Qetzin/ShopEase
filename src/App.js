import RootLayout from './components/RootLayout';
import ShoppingItems from './pages/ShoppingItems';
import { CartContextProvider } from './store/CartContext';
import Cart from './components/Cart';
import { UserProgressContextProvider } from './store/UserProgressContext';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ItemDetails from './pages/ItemDetails';
import { OptionsContextProvider } from './store/OptionsContext';
import CategoryPage from './pages/CategoryPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ErrorPage from './pages/Error.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Navigate to="/items" /> },
      { path: '/items', element: <ShoppingItems /> },
      { path: '/items/:id', element: <ItemDetails /> },
      { path: '/category/:name', element: <CategoryPage />},
      { path: '/items/search', element: <SearchResultsPage />}
    ],
  }
]);

function App() {
  return (
    <UserProgressContextProvider>
      <OptionsContextProvider>
        <CartContextProvider >
          <Cart />
          <RouterProvider router={router}>
          </RouterProvider>
        </CartContextProvider>
      </OptionsContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
