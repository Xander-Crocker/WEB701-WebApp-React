

const Home = () => {
    return (
        <div>
        <h1>Welcome to the Home Page</h1>
        <br />
            {/* navigate to records button if admin if not navigate to login */}
            <button onClick={() => window.location.href = '/records'} 
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" 
                >Records
            </button>
        </div>
    );
};

export default Home;