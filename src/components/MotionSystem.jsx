import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

/** Shared, route-aware scroll motion. Animations only touch opacity and transforms. */
const MotionSystem = () => {
  const location = useLocation();

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      document.documentElement.classList.add('motion-reduced');
      return () => document.documentElement.classList.remove('motion-reduced');
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      smoothTouch: false,
      anchors: true,
    });
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onLenisScroll);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const splitTitles = [];
    document.querySelectorAll('.cinematic-title').forEach((element) => {
      const split = new SplitType(element, { types: 'lines', lineClass: 'cinematic-line' });
      splitTitles.push(split);
      gsap.from(split.lines, {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.15,
        clearProps: 'all',
      });
    });

    const context = gsap.context(() => {
      gsap.utils.toArray('[data-scene-reveal], main section').forEach((element) => {
        gsap.fromTo(element,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    });

    ScrollTrigger.refresh();
    return () => {
      context.revert();
      splitTitles.forEach((split) => split.revert());
      lenis.off('scroll', onLenisScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [location.pathname]);

  return null;
};

export default MotionSystem;
