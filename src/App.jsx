import Footer from './component/Footer/Footer';
import Header from './component/Header';
import { ScrollToTop } from './component/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Router } from './routes';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <ScrollToTop />
        <Router />
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
