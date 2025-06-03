export default function PageNotFound(){

return (
<>
 <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/">
           <button
            className="w-full h-14 sm:text-lg font-semibold bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:text-gray-500 rounded-full transition-all duration-200"
          >
              Return to Home
          </button>
        </a>
      </div>
    </div>
</>
)
};