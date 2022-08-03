import { SLIDE_ROUTES } from "../constants";
import { Link } from "react-router-dom";

export function SlideshowList() {
  return (
    <ul>
      {SLIDE_ROUTES.map((slide) => {
        return (
          <li key={slide.path}>
            <Link to={`/slides/${slide.path}`}>Slide {slide.path}</Link>
          </li>
        );
      })}
    </ul>
  );
}
