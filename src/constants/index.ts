function getMarkdownRoutes() {
  const slideFiles = import.meta.glob("../slides/**/*.md");
  const pathArr = Object.entries(slideFiles).map(([path]) => path);

  return pathArr.map((path) => {
    return {
      path: path.replace("../slides/", "").replace(".md", ""),
    };
  });
}

export const SLIDE_ROUTES = getMarkdownRoutes();
