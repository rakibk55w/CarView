import Layout from "./components/Layout";

function App() {
    const loggedIn = true;

    return (
        <Layout loggedIn={loggedIn}>
            <h1 className="text-4xl font-bold">
                Home Page
            </h1>
        </Layout>
    );
}

export default App;

