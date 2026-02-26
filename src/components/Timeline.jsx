// Timeline.js
import React, { useState, useEffect, useRef } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import "../Styles/Timeline.css";
import gsap from 'gsap';

const Timeline = () => {
  const [isPinned, setIsPinned] = useState(false);
  const timelineContainerRef = useRef(null);
  const pinnedY = useRef(0); // For GSAP quickTo

  useEffect(() => {
    // Create a GSAP quickTo instance for efficient updates
    const ctx = gsap.context(() => {
      pinnedY.current = gsap.quickTo(timelineContainerRef.current, "y", {
        duration: 0.5,
        ease: "power2.out"
      });
    }, timelineContainerRef);

    return () => ctx.revert(); // Clean up
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Threshold: adjust based on your layout (e.g., when the timeline enters view)
      const threshold = 200;
      const shouldPin = scrollY > threshold;
      setIsPinned(shouldPin);
      // Update GSAP animation
      if (pinnedY.current) {
        pinnedY.current(shouldPin ? -50 : 0); // Move up slightly when pinned
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="timeline-wrapper">
      <h2 className="timeline-title">Our Journey</h2>
      <div
        ref={timelineContainerRef}
        className={`timeline-container ${isPinned ? 'timeline-pinned' : ''}`}
      >
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'var(--timeline-element-bg)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid var(--timeline-arrow-color)' }}
            iconStyle={{ background: 'var(--timeline-icon-bg)', color: '#fff' }}
          >
            <h3 className="headertimeline">Comprehensive Training Program</h3>
            <p className="texttimeline">
              Embark on your journey with our intensive training program, designed to equip you with essential skills across various courses. Upon completion, you will undergo an interview and project review. Successful candidates will then be selected for a prestigious paid internship.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'var(--timeline-element-bg)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid var(--timeline-arrow-color)' }}
            iconStyle={{ background: 'var(--timeline-icon-bg)', color: '#fff' }}
          >
            <h3 className="headertimeline">Global Certification and Goodies</h3>
            <p className="texttimeline">
              Receive a globally recognized certification and a selection of exclusive goodies. Spectov, in partnership with Microsoft, is committed to providing top-tier services and ensuring you receive the best in industry standards.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'var(--timeline-element-bg)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid var(--timeline-arrow-color)' }}
            iconStyle={{ background: 'var(--timeline-icon-bg)', color: '#fff' }}
          >
            <h3 className="headertimeline">Paid Internship Opportunity</h3>
            <p className="texttimeline">
              Secure a paid internship with a stipend of up to ₹10,000. With a 100% chance of landing this opportunity, you will gain invaluable experience and further develop your professional skills in a real-world setting.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'var(--timeline-element-bg)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid var(--timeline-arrow-color)' }}
            iconStyle={{ background: 'var(--timeline-icon-bg)', color: '#fff' }}
          >
            <h3 className="headertimeline">Full-Time Employment Potential</h3>
            <p className="texttimeline">
              Impress us with your dedication and exceptional work during your internship, and you will be considered for a full-time position at Spectov. We are always on the lookout for talented individuals to join our team permanently.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Timeline;