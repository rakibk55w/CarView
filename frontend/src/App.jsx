import Layout from "./components/Layout";
import Home from "./pages/Home";

function App() {
    const loggedIn = true;

    return (
        <Layout loggedIn={loggedIn}>
           <Home />
        </Layout>
    );
}

export default App;

