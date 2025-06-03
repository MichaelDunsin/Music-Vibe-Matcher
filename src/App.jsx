import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from './pages/home';
import Songs from './pages/songs';
import Preview from './pages/preview';
import About from './pages/about';
import PageNotFound from './pages/pagenotfound';


function App() {
  
    const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout/>}>
          <Route index element={<Home/>} />
      <Route path="songs" element={<Songs/>} />
        <Route path="preview/:id" element={<Preview/>} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="about" element={<About />} />
      </Route>
    )
  )

  return (
    <>
  <RouterProvider router={router} />
    </>
  )
}

export default App
