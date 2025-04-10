import Footer from './component/Footer/Footer';
import Header from './component/Header';
import { ScrollToTop } from './component/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserProvider';
import { Router } from './routes';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <Header />
          <ScrollToTop />
          <Router />
          <Footer />
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
