import './App.css';
import AppRouter from './routers/AppRouter';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
