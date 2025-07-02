
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const AcademyList = lazy(() => import("./pages/AcademyList"));
const AcademyDetail = lazy(() => import("./pages/AcademyDetail"));
const Feed = lazy(() => import("./pages/Feed"));
const Chat = lazy(() => import("./pages/Chat"));
const StudentResults = lazy(() => import("./pages/StudentResults"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Index />
              </Suspense>
            }
          />
          <Route
            path="/academies"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AcademyList />
              </Suspense>
            }
          />
          <Route
            path="/academy/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AcademyDetail />
              </Suspense>
            }
          />
          <Route
            path="/feed"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Feed />
              </Suspense>
            }
          />
          <Route
            path="/chat/:academyId"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Chat />
              </Suspense>
            }
          />
          <Route
            path="/academy/:academyId/results"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <StudentResults />
              </Suspense>
            }
          />
          <Route
            path="/news/:newsId"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <NewsDetail />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
