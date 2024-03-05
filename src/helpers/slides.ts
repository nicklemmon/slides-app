type Slide = {
  slideshowId: string;
  pathList: string[];
};

type ModulePath = {
  slideshowId: string;
  path: string;
};

// Define a named function with TypeScript typings
export function getSlides(): Slide[] {
  // Dynamically import markdown files. Adjust the path as necessary.
  const modules = import.meta.glob("/src/slides/**/*.md", { eager: true });

  // Transform and reduce the modules into the desired structure
  const slidesArray: Slide[] = Object.keys(modules)
    .map((path): ModulePath => {
      // Adjust the path to match your project structure
      const cleanPath = path.replace("/src/slides/", "").replace(".md", "");
      const [slideshowId, fileName] = cleanPath.split("/");
      return { slideshowId, path: `${slideshowId}/${fileName}.md` };
    })
    .reduce((acc: Slide[], { slideshowId, path }): Slide[] => {
      let entry = acc.find((e) => e.slideshowId === slideshowId);
      if (!entry) {
        entry = { slideshowId, pathList: [] };
        acc.push(entry);
      }
      entry.pathList.push(path);
      return acc;
    }, []);

  return slidesArray;
}
