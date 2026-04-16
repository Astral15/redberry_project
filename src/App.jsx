import AppRouter from "./app/AppRouter";
import { AppProvider } from "./app/AppContext";

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}