import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Router } from './routes';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
