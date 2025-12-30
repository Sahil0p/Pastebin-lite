// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CreatePaste from "./pages/CreatePaste";
// import ViewPaste from "./pages/ViewPaste";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ListPastes from "./pages/ListPastes";
// import { Toaster } from "react-hot-toast";
// <Toaster position="top-center" />



// export default function App() {
//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col bg-gray-50">
//         <Navbar />
//         <main className="flex-1 container mx-auto px-4 py-8">
//           <Routes>
//             <Route path="/" element={<CreatePaste />} />
//             <Route path="/p/:id" element={<ViewPaste />} />
//             <Route path="/list" element={<ListPastes />} /> 
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePaste from "./pages/CreatePaste";
import ViewPaste from "./pages/ViewPaste";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ListPastes from "./pages/ListPastes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col 
        bg-light-gradient dark:bg-pro-gradient transition-all duration-500">

        <Navbar />

        <main className="flex-1 container mx-auto px-4 py-10">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<CreatePaste />} />
              <Route path="/p/:id" element={<ViewPaste />} />
              <Route path="/list" element={<ListPastes />} />
            </Routes>
          </div>
        </main>

        <Footer />
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}
