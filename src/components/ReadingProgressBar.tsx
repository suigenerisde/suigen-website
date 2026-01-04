/**
 * Reading Progress Bar Component
 *
 * A high-performance, accessible scroll progress indicator for blog posts.
 * Shows reading progress with a gradient bar at the top of the viewport.
 *
 * Features:
 * - 60fps smooth performance (throttle + requestAnimationFrame)
 * - Full ARIA accessibility support
 * - Reduced motion support (WCAG 2.1)
 * - Dark mode compatible
 * - SSR-safe (Next.js App Router)
 * - Zero hydration errors
 *
 * @example
 * ```tsx
 * // In blog post layout
 * import { ReadingProgressBar } from '@/components/ReadingProgressBar';
 *
 * export default function BlogLayout({ children }) {
 *   return (
 *     <>
 *       <ReadingProgressBar />
 *       {children}
 *     </>
 *   );
 * }
 * ```
 *
 * @author Atlas (Principal Software Engineer)
 * @version 1.0.0
 * @date 2026-01-04
 */

'use client';

import { useEffect, useState, useCallback } from 'react';

/**
 * Props interface for ReadingProgressBar component
 */
export interface ReadingProgressBarProps {
  /**
   * Height of the progress bar in pixels
   * @default 4
   */
  height?: number;

  /**
   * Custom CSS class for styling
   */
  className?: string;

  /**
   * Minimum progress percentage threshold to show the bar
   * Useful to hide bar at the very top of the page
   * @default 0
   */
  showThreshold?: number;

  /**
   * Whether to show a subtle glow effect
   * @default true
   */
  showGlow?: boolean;

  /**
   * Custom gradient colors (Tailwind classes)
   * @default 'from-[#FB7C00] via-[#E73B50] to-[#9E009B]'
   */
  gradientClasses?: string;

  /**
   * Throttle delay in milliseconds (16ms = ~60fps)
   * @default 16
   */
  throttleMs?: number;

  /**
   * ARIA update step (updates screen reader every N%)
   * Prevents screen reader spam
   * @default 5
   */
  ariaUpdateStep?: number;
}

/**
 * Reading Progress Bar Component
 *
 * Displays a fixed-top gradient progress bar indicating scroll position.
 * Optimized for performance with throttling and requestAnimationFrame.
 */
export function ReadingProgressBar({
  height = 4,
  className = '',
  showThreshold = 0,
  showGlow = true,
  gradientClasses = 'from-[#FB7C00] via-[#E73B50] to-[#9E009B]',
  throttleMs = 16,
  ariaUpdateStep = 5,
}: ReadingProgressBarProps = {}) {
  // Visual progress state (updates every frame)
  const [progress, setProgress] = useState(0);

  // ARIA progress state (updates in steps to avoid screen reader spam)
  const [ariaValue, setAriaValue] = useState(0);

  /**
   * Calculate and update scroll progress
   * Memoized to prevent unnecessary recreations
   */
  const updateProgress = useCallback(() => {
    // Total scrollable height
    const scrolled = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Calculate percentage (handle edge case where total = 0)
    const percentage = totalHeight > 0 ? Math.min((scrolled / totalHeight) * 100, 100) : 0;

    // Update visual progress immediately
    setProgress(percentage);

    // Update ARIA value only at specified intervals
    const roundedProgress = Math.round(percentage);
    if (Math.abs(roundedProgress - ariaValue) >= ariaUpdateStep) {
      setAriaValue(roundedProgress);
    }
  }, [ariaValue, ariaUpdateStep]);

  /**
   * Set up scroll listener with performance optimizations
   */
  useEffect(() => {
    // Initial calculation
    updateProgress();

    // Performance optimization: Throttle + requestAnimationFrame
    let ticking = false;
    let lastUpdate = 0;

    const handleScroll = () => {
      const now = Date.now();

      // Throttle: Skip if called too soon
      if (now - lastUpdate < throttleMs) return;

      // Request animation frame if not already pending
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
          lastUpdate = Date.now();
        });
        ticking = true;
      }
    };

    // Add listeners
    // { passive: true } = browser can optimize scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateProgress); // Recalculate on resize

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, [updateProgress, throttleMs]);

  // Hide bar if below threshold
  if (progress < showThreshold) return null;

  return (
    <div
      role="progressbar"
      aria-label="Lesefortschritt"
      aria-valuenow={ariaValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-live="polite"
      aria-atomic="true"
      className={`fixed top-0 left-0 right-0 z-[100] bg-transparent ${className}`}
      style={{ height: `${height}px` }}
    >
      <div
        className={`
          h-full
          bg-gradient-to-r ${gradientClasses}
          transition-all duration-200 ease-out
          motion-reduce:transition-none
          ${showGlow ? 'shadow-md shadow-purple-500/30' : ''}
        `}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/**
 * Simplified variant for minimal usage
 * Uses all default settings
 */
export function SimpleReadingProgressBar() {
  return <ReadingProgressBar />;
}

/**
 * Dark theme variant with adjusted colors
 * Better visibility on dark backgrounds
 */
export function DarkReadingProgressBar() {
  return (
    <ReadingProgressBar
      gradientClasses="from-orange-400 via-pink-400 to-purple-500"
      showGlow={false}
    />
  );
}

/**
 * Minimal variant (Medium-style)
 * Thin black/white line without gradient
 */
export function MinimalReadingProgressBar() {
  return (
    <ReadingProgressBar
      height={2}
      gradientClasses="from-black to-black dark:from-white dark:to-white"
      showGlow={false}
    />
  );
}

export default ReadingProgressBar;
