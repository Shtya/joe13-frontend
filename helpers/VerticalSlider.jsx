export default function VerticalSlider() {

	// const [countTop , setcountTop] = useState(0)
	// const [countBottom , setcountBottom] = useState(0)
	let play = true
	let countTop = 0
	let countBottom = 0


	const handleScrollInside = (swiper) => {
		swiper.on('slideChangeTransitionEnd', () => {
	
			const activeSlide = document.querySelector('.swiper-slide-active');
			const slideHeight = activeSlide.clientHeight;
			const slideInnerHeight = activeSlide.scrollHeight;
			
			if (activeSlide.classList.contains('footer-slide')) { play = false }
			else { play = true; }

			if (slideInnerHeight > slideHeight) {

				swiper.mousewheel.disable();
				swiper.allowTouchMove = false;
	
				const handleInnerScroll = (event) => {
					const scrollTop = Math.ceil(activeSlide.scrollTop);
					const scrollDifference = slideInnerHeight - slideHeight;
	
					if (scrollTop === 0) {
						countTop +=1
						activeSlide.scrollTo({ top: 30, left: 0, behavior:'smooth' })
						if(countTop >= 2){
							activeSlide.removeEventListener('scroll', handleInnerScroll);
							swiper.mousewheel.enable();
							swiper.allowTouchMove = true;
							swiper.slidePrev();
						}
					}
					
					if (scrollTop >= (scrollDifference - 5 ) && play != false ) {
						countBottom +=1
						activeSlide.scrollTop = scrollDifference - 50
	
						if(countBottom >= 2){
						activeSlide.removeEventListener('scroll', handleInnerScroll);
						swiper.mousewheel.enable();
						swiper.allowTouchMove = true;
						swiper.slideNext();
						}
					}
				};
	
				activeSlide.addEventListener('scroll', handleInnerScroll, { passive: true });
				handleInnerScroll();
			} else {
				countBottom = 0
				countTop = 0
				swiper.mousewheel.enable();
				swiper.allowTouchMove = true;
			}
		});
	
		swiper.emit('slideChangeTransitionEnd');
	};

	return {handleScrollInside}
}
