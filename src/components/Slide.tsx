import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

type Layout = "default" | "title";

type FrontmatterState = {
  title: string;
  description?: string;
  layout?: Layout;
};

type Status = "loading" | "loaded";

export function Slide() {
  const [frontmatter, setFrontmatter] = useState<FrontmatterState>({
    title: "",
    description: "",
    layout: "default",
  });
  const [status, setStatus] = useState<Status>("loading");
  const [html, setHtml] = useState<string>();
  const { slideShowId, slideId } = useParams<{
    slideShowId?: string;
    slideId?: string;
  }>();

  const PageTitleHandler = () => {
    return (
      <Helmet>
        <title>{frontmatter.title} | Slides</title>
      </Helmet>
    );
  };

  useEffect(() => {
    async function loadSlide() {
      setStatus("loading");

      await import(`../slides/${slideShowId}/${slideId}.md`).then(
        (markdown) => {
          setStatus("loaded");
          const domParser = new DOMParser();
          const doc = domParser.parseFromString(markdown.html, "text/html");

          setFrontmatter(markdown?.attributes ? markdown.attributes : {});
          setHtml(
            `<div class="long-form">${doc.documentElement.innerHTML}</div>`
          );
        }
      );
    }

    loadSlide();
  }, [slideId]);

  if (frontmatter.layout === "title") {
    return (
      <>
        <PageTitleHandler />

        <AnimatedSlide className="slide__title-layout" status={status}>
          <div className="slide__header">
            <h1>{frontmatter.title}</h1>

            <h2>{frontmatter.description}</h2>
          </div>

          <div
            className="slide__content"
            dangerouslySetInnerHTML={{ __html: html ?? "" }}
          />
        </AnimatedSlide>
      </>
    );
  }

  return (
    <>
      <PageTitleHandler />

      <AnimatedSlide status={status}>
        <div className="slide__header">
          <h1>{frontmatter.title}</h1>

          <h2>{frontmatter.description}</h2>
        </div>

        <div
          className="slide__content"
          dangerouslySetInnerHTML={{ __html: html ?? "" }}
        />
      </AnimatedSlide>
    </>
  );
}

function AnimatedSlide({
  status,
  children,
  className,
}: {
  status: Status;
  children: React.ReactNode;
  className?: string;
}) {
  if (status !== "loaded") return null;

  return (
    <motion.div
      className={classNames("slide__animated-slide", className)}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
