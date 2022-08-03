import { Outlet, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Slide, Slideshow, SlideshowList } from "./components";

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
          element: <SlideshowList />,
        },
        {
          path: "/slides/:slideShowId",
          element: <Slideshow />,
          children: [
            {
              path: "/slides/:slideShowId/:slideId",
              element: <Slide />,
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
