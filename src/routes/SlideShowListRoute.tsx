import { Link } from "react-router-dom";
import { getSlides } from "../helpers/slides";
import { toTitleCase } from "../helpers/string";

export function SlideShowListRoute() {
  const slideRoutes = getSlides();

  return (
    <div>
      <h1>Slide shows</h1>

      <ul>
        {slideRoutes.map((slideRoute) => {
          return (
            <li key={slideRoute.slideshowId}>
              <Link to={`/slides/${slideRoute.slideshowId}/01`}>
                {toTitleCase(slideRoute.slideshowId)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
