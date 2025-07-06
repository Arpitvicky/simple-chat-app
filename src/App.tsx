import styles from "./App.module.css";
import { ChatWindow } from "./components/ChatWindow/ChatWindow";

function App() {
  return (
    <div className={styles.appContainer}>
      <ChatWindow />
    </div>
  );
}

export default App;
