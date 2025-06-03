import { Outlet } from "react-router-dom"

export default function RootLayout(){

return (
<>
<div className="min-h-screen relative z-10 bg-gray-900 text-white">
<Outlet/>
</div>
</>
)
};

