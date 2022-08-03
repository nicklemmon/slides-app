import { useEffect } from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import { useKeyPress } from "../hooks/useKeyPress";
import { SLIDE_ROUTES } from "../constants";

export function Slideshow() {
  const navigate = useNavigate();
  const arrowRightPressed = useKeyPress("ArrowRight");
  const arrowLeftPressed = useKeyPress("ArrowLeft");
  const { slideShowId, slideId } = useParams<{
    slideShowId?: string;
    slideId?: string;
  }>();
  const idVal = slideId ? parseInt(slideId) : 0;
  const hasPrev = idVal > 1;
  const hasNext =
    idVal <
    SLIDE_ROUTES.filter(({ path }) => {
      return path.includes(slideShowId ?? "");
    }).length;
  const prevPath = `/slides/${slideShowId}/${toPageValue(idVal - 1)}`;
  const nextPath = `/slides/${slideShowId}/${toPageValue(idVal + 1)}`;

  useEffect(() => {
    if (hasNext && arrowRightPressed) navigate(nextPath);
  }, [arrowRightPressed]);

  useEffect(() => {
    if (hasPrev && arrowLeftPressed) navigate(prevPath);
  }, [arrowLeftPressed]);

  return (
    <div className="slideshow">
      <Outlet />

      <div className="slideshow__links">
        {hasPrev ? (
          <Link className="slideshow__prev" to={prevPath}>
            Previous slide
          </Link>
        ) : (
          <div />
        )}

        {hasNext ? (
          <Link className="slideshow__next" to={nextPath}>
            Next slide
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

function toPageValue(val: number) {
  if (val < 10) return `0${val}`;

  return val;
}
