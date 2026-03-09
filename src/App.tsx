import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Letters from "./pages/Letters";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import FloatingElements from "./components/FloatingElements";
import MusicPlayer from "./components/MusicPlayer";

const queryClient = new QueryClient();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    () => sessionStorage.getItem("birthday-auth") === "true"
  );

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <FloatingElements />
          <Navbar />
          <MusicPlayer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/letters" element={<Letters />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
