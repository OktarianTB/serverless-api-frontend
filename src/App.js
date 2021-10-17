import { Router } from "@reach/router";
import ViewPosts from "./components/ViewPosts";
import "./App.css";

function App() {
  return (
    <Router>
      <ViewPosts path="/" />
    </Router>
  );
}

export default App;
