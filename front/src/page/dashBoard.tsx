import Sidebar from "../componets/Sidebar";

export function dashBoard() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100 md:flex-row">
            <Sidebar />
            <main className="flex flex-1 flex-col items-center justify-center p-8">
                <h1 className="mb-4 text-4xl font-bold">Dashboard</h1>
                <p className="text-lg text-gray-700">Welcome to the dashboard!</p>
            </main>
        </div>
    );
}
