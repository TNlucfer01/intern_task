import { AuthPage } from "./page/AuthPage";
import { useAuth } from "./context/authContext";

function App() {
    const { user, isLoading, sessionError, checkSession } = useAuth();

    if (isLoading) {
        return <div>Loading session...</div>;
    }

    if (user === undefined) {
        return (
            <div role="alert">
                <p>{sessionError ?? "Unable to check your session."}</p>
                <button type="button" onClick={() => void checkSession()}>
                    Try again
                </button>
            </div>
        );
    }

    return <AuthPage />;
}

export default App;
