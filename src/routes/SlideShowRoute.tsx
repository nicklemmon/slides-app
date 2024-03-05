import { useEffect } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import { useKeyPress } from "../hooks/useKeyPress";
import { getSlides } from "../helpers/slides";

export function SlideshowRoute() {
  const navigate = useNavigate();
  const slideRoutes = getSlides();
  const arrowRightPressed = useKeyPress("ArrowRight");
  const arrowLeftPressed = useKeyPress("ArrowLeft");
  const { slideShowId: slideShowIdParam, slideId } = useParams<{
    slideShowId?: string;
    slideId?: string;
  }>();
  const idVal = slideId ? parseInt(slideId) : 0;
  const hasPrev = idVal > 1;
  const currentSlideRoutes = slideRoutes.find(({ slideshowId }) => {
    return slideshowId === slideShowIdParam;
  });
  const hasNext = currentSlideRoutes?.pathList
    ? idVal < currentSlideRoutes.pathList.length
    : false;
  const prevPath = `/slides/${slideShowIdParam}/${toPageValue(idVal - 1)}`;
  const nextPath = `/slides/${slideShowIdParam}/${toPageValue(idVal + 1)}`;

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
            <BsChevronLeft />
          </Link>
        ) : (
          <div />
        )}

        {hasNext ? (
          <Link className="slideshow__next" to={nextPath}>
            <BsChevronRight />
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
