import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import MapView from "./pages/MapView";
import ReportIssue from "./pages/ReportIssue";
import MyIssues from "./pages/MyIssues";
import OfflineRequests from "./pages/OfflineRequests";
import Community from "./pages/Community";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Tokens from "./pages/Tokens";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-12 flex items-center border-b bg-card px-4">
                <SidebarTrigger className="mr-2" />
                <h1 className="text-lg font-semibold text-primary">Civic Connect</h1>
              </header>
              <main className="flex-1 relative">
                <Navigation />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/map" element={<MapView />} />
                  <Route path="/report" element={<ReportIssue />} />
                  <Route path="/my-issues" element={<MyIssues />} />
                  <Route path="/offline" element={<OfflineRequests />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/tokens" element={<Tokens />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
