"use client"
import { useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextAnimation = ({text , cn}) => {

  useEffect(() => {
    const elements = document.querySelectorAll('.animation');

    elements.forEach((element) => {
      let newText = '';
      const theText = element;
      
      for (let i = 0; i < theText.innerText.length; i++) {
        newText += '<div>';
        if (theText.innerText[i] === ' ') {
          newText += '&nbsp;';
        } else {
          newText += theText.innerText[i];
        }
        newText += '</div>';
      }
      
      theText.innerHTML = newText;

      gsap.fromTo(
        element.querySelectorAll('div'),
        {
          opacity: 0,
          y: 90,
        },
        {
          duration: 2,
          opacity: 1,
          y: 0,
          stagger: 0.03,
          ease: 'elastic(1.2, 0.5)',
          scrollTrigger: {
            trigger: element,
            start: 'top 70%',
            toggleActions: 'restart none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <div className={`flex items-center text-center animation ${cn} `}> {text} </div>
  );
};

export default TextAnimation;
