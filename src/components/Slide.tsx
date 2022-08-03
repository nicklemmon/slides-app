import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { LongForm } from "./Longform";

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
        <title>{frontmatter.title} | TWC Slides</title>
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

        <AnimatedSlide status={status}>
          <div className="slide__title-layout">
            <div className="slide__title">
              <h1>{frontmatter.title}</h1>
            </div>

            <div className="slide__description">
              <h2>{frontmatter.description}</h2>
            </div>

            <div
              className="slide__content"
              dangerouslySetInnerHTML={{ __html: html ?? "" }}
            />
          </div>
        </AnimatedSlide>
      </>
    );
  }

  return (
    <>
      <PageTitleHandler />

      <AnimatedSlide status={status}>
        <LongForm>
          <div className="slide__title">
            <h1>{frontmatter.title}</h1>
          </div>

          <div className="slide__description">
            <h2>{frontmatter.description}</h2>
          </div>

          <div
            className="slide__content"
            dangerouslySetInnerHTML={{ __html: html ?? "" }}
          />
        </LongForm>
      </AnimatedSlide>
    </>
  );
}

function AnimatedSlide({
  status,
  children,
}: {
  status: Status;
  children: React.ReactNode;
}) {
  if (status !== "loaded") return null;

  return (
    <motion.div
      className="slide__animated-slide"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
