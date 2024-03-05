import { Outlet, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SlideRoute } from "./routes/SlideRoute";
import { SlideshowRoute } from "./routes/SlideShowRoute";
import { SlideShowListRoute } from "./routes/SlideShowListRoute";

function App() {
  return <AppContent />;
}

function AppContent() {
  const routes = [
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <SlideShowListRoute />,
        },
        {
          path: "/slides/:slideShowId",
          element: <SlideshowRoute />,
          children: [
            {
              path: "/slides/:slideShowId/:slideId",
              element: <SlideRoute />,
            },
          ],
        },
        {
          path: "*",
          element: <NoMatch />,
        },
      ],
    },
  ];

  const element = useRoutes(routes);

  return <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>;
}

function NoMatch() {
  return <h1>No match!</h1>;
}

export default App;
