
const PasswordSection = ({ password, setPassword }) => {



    return (
        <>
            <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-lg 
                            bg-slate-800/60 border border-slate-700 
                            text-white placeholder-slate-400 
                            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                            transition"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}

                value={password}
            />
        </>
    )
}

export default PasswordSection
