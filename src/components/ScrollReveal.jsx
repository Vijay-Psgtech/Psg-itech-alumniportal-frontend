import { useEffect, useRef } from "react";

const REVEAL_SELECTOR = [
  "#route-content section",
  "#route-content article",
  "#route-content [data-scroll-reveal]",
].join(", ");

export default function ScrollReveal({ children }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return undefined;

    const targets = new Set();
    const reveal = (element) => {
      if (!(element instanceof HTMLElement) || targets.has(element)) return;
      targets.add(element);
      const siblingIndex = Array.prototype.indexOf.call(element.parentElement?.children ?? [], element);
      element.style.setProperty("--scroll-reveal-delay", `${Math.min(siblingIndex * 65, 390)}ms`);
      element.classList.add("site-scroll-reveal");
      observer.observe(element);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("site-scroll-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    const scan = (node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches(REVEAL_SELECTOR)) reveal(node);
      node.querySelectorAll(REVEAL_SELECTOR).forEach(reveal);
    };

    scan(root);
    root.classList.add("site-scroll-reveal-ready");

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach(scan);
        record.removedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          targets.forEach((element) => {
            if (element === node || node.contains(element)) {
              observer.unobserve(element);
              element.classList.remove("site-scroll-reveal", "site-scroll-reveal-visible");
              element.style.removeProperty("--scroll-reveal-delay");
              targets.delete(element);
            }
          });
        });
      });
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      root.classList.remove("site-scroll-reveal-ready");
      targets.forEach((element) => {
        element.classList.remove("site-scroll-reveal", "site-scroll-reveal-visible");
        element.style.removeProperty("--scroll-reveal-delay");
      });
    };
  }, []);

  return (
    <div id="route-content" ref={rootRef}>
      {children}
    </div>
  );
}
