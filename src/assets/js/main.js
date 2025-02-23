/* Main Js Start */

document.addEventListener('DOMContentLoaded', function () {
	// Ensure loader is visible before the page starts loading
	document.getElementById('loading').style.display = 'block';
});

window.addEventListener('load', function () {
	// Hide loader once the page fully loads
	document.getElementById('loading').style.display = 'none';
});

(function ($) {
	'use strict';

	$(document).ready(function () {
		// $(window).on('load', function () {
		// 	$('#loading').fadeOut();
		// });

		// sticky header
		$(window).on('scroll', function () {
			if ($(window).scrollTop() >= 60) {
				$('.header').addClass('fixed-header');
			} else {
				$('.header').removeClass('fixed-header');
			}
		});

		// new WOW().init();

		// Splitting();

		const text = document.querySelector('#text p');

		text.innerHTML = text.innerText
			.split('')
			.map(
				(char, i) =>
					`<span style="transform:rotate(${parseInt(
						i * 10
					)}deg)">${char}</span>`
			)
			.join('');

		var swiper = new Swiper('.mySwiper', {
			loop: true,
			spaceBetween: 10,
			slidesPerView: 3,
			freeMode: true,
			watchSlidesProgress: true,
			breakpoints: {
				0: {
					spaceBetween: 5,
					slidesPerView: 1,
				},
				580: {
					spaceBetween: 5,
					slidesPerView: 2,
				},
				768: {
					spaceBetween: 5,
					slidesPerView: 3,
				},
				1200: {
					spaceBetween: 5,
					slidesPerView: 3,
				},
			},
		});
		var swiper2 = new Swiper('.mySwiper2', {
			loop: true,
			spaceBetween: 100,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				// 0: {
				// 	spaceBetween: 50,
				// },
				// 768: {
				// 	spaceBetween: 100,
				// },
				// 1200: {
				// 	spaceBetween: 50,
				// },
			},
			thumbs: {
				swiper: swiper,
			},

			on: {
				slideChangeTransitionStart: function () {
					let activeSlide = document.querySelector('.swiper-slide-active');
					// gsap.set('.swiper-slide', { opacity: 0, y: 30 });
					// Reset all elements before animation
					gsap.set(activeSlide.querySelector('.title'), {
						opacity: 0.5,
						y: 50,
					});
					gsap.set(activeSlide.querySelector('.description'), {
						opacity: 0,
						y: 50,
					});
					gsap.set(activeSlide.querySelector('.text-mid'), {
						opacity: 0,
						y: 50,
					});
					gsap.set(activeSlide.querySelector('.email-box'), {
						opacity: 0,
						y: 50,
					});
					gsap.set(activeSlide.querySelector('.slide-image'), {
						opacity: 0,
						scale: 1.1,
					});

					// Animate elements in the active slide
					gsap.to(activeSlide.querySelector('.title'), {
						opacity: 1,
						y: 0,
						duration: 1,
						ease: 'power2.out',
						delay: 0.2,
					});

					gsap.fromTo(
						activeSlide.querySelector('.star-icon'),
						{ rotation: 0 }, // Start at 0 degrees
						{
							rotation: 90, // Rotate 2 full times
							duration: 2, // Smooth animation
							ease: 'power2.out',
						}
					);

					gsap.to(activeSlide.querySelector('.text-mid'), {
						opacity: 1,
						y: 0,
						duration: 1,
						ease: 'power2.out',
						delay: 0.3,
					});
					gsap.to(activeSlide.querySelector('.description'), {
						opacity: 1,
						y: 0,
						duration: 1,
						ease: 'power2.out',
						delay: 0.4,
					});

					gsap.to(activeSlide.querySelector('.email-box'), {
						opacity: 1,
						y: 0,
						duration: 1,
						ease: 'power2.out',
						delay: 0.6,
					});

					gsap.to(activeSlide.querySelector('.slide-image'), {
						opacity: 1,
						scale: 1,
						duration: 1.2,
						ease: 'power2.out',
						delay: 0.8,
					});

					// Text Splitting
					const titleElement = activeSlide.querySelector('.title');
					const splitTitle = new SplitText(titleElement, { type: 'chars' });

					gsap.set(splitTitle.chars, { opacity: 0, y: 50 });

					gsap.to(splitTitle.chars, {
						opacity: 1,
						y: 0,
						duration: 1,
						stagger: 0.05,
						ease: 'power2.out',
					});
				},
				slideChangeTransitionEnd: function () {
					// gsap.to('.swiper-slide', {
					// 	opacity: 1,
					// 	y: 0,
					// 	duration: 0.8,
					// 	stagger: 0.05,
					// 	ease: 'power2.out',
					// });
				},
			},
		});
	});
})(jQuery);

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// create the smooth scroller FIRST!
const smoother = ScrollSmoother.create({
	wrapper: '#wrapper',
	content: '#content',
	smooth: 1,
	normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
	ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
	effects: true,
	preventDefault: true,
});
// Select all `.content` elements
const sections = document.querySelectorAll('.row');

// Loop through each section and add animations
sections.forEach((content) => {
	gsap.fromTo(
		content,
		{ opacity: 0, y: 50 }, // Start values
		{
			opacity: 1,
			y: 0,
			duration: 1,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: content,
				start: 'top 90%',
				toggleActions: 'play none none reverse',
			},
		}
	);
});

// Select all `.content` elements
const projectList = document.querySelectorAll('.row');

// Loop through each content and add left-to-right animation
projectList.forEach((content, index) => {
	// Alternate animations for even and odd sections
	const animation =
		index % 2 === 0
			? { opacity: 1, x: 0 } // Left-to-right
			: { opacity: 1, y: 0 }; // Fade and slide up

	gsap.fromTo(
		content,
		index % 2 === 0 ? { opacity: 0, x: -100 } : { opacity: 0, y: 50 }, // Start values
		{
			...animation,
			duration: 1,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: content,
				start: 'top 80%',
			},
		}
	);
});

document.addEventListener('DOMContentLoaded', () => {
	gsap.registerPlugin(ScrollTrigger);

	// Section title animation
	gsap.from('.section-title', {
		scrollTrigger: {
			trigger: '.section-title',
			start: 'top 85%', // Start when the title is in the viewport
			toggleActions: 'play none none reverse',
		},
		opacity: 0, // Start invisible
		y: -50, // Slide in from above
		duration: 1, // Animation duration
		ease: 'power2.out', // Smooth easing
	});

	function horizontalLoop(items, config) {
		items = gsap.utils.toArray(items);
		config = config || {};
		let tl = gsap.timeline({
				repeat: config.repeat,
				paused: config.paused,
				defaults: { ease: 'none' },
				onReverseComplete: () =>
					tl.totalTime(tl.rawTime() + tl.duration() * 100),
			}),
			length = items.length,
			startX = items[0].offsetLeft,
			times = [],
			widths = [],
			xPercents = [],
			curIndex = 0,
			pixelsPerSecond = (config.speed || 1) * 100,
			snap =
				config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
			totalWidth,
			curX,
			distanceToStart,
			distanceToLoop,
			item,
			i;
		gsap.set(items, {
			// convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
			xPercent: (i, el) => {
				let w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px')));
				xPercents[i] = snap(
					(parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 +
						gsap.getProperty(el, 'xPercent')
				);
				return xPercents[i];
			},
		});
		gsap.set(items, { x: 0 });
		totalWidth =
			items[length - 1].offsetLeft +
			(xPercents[length - 1] / 100) * widths[length - 1] -
			startX +
			items[length - 1].offsetWidth *
				gsap.getProperty(items[length - 1], 'scaleX') +
			(parseFloat(config.paddingRight) || 0);
		for (i = 0; i < length; i++) {
			item = items[i];
			curX = (xPercents[i] / 100) * widths[i];
			distanceToStart = item.offsetLeft + curX - startX;
			distanceToLoop =
				distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');
			tl.to(
				item,
				{
					xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
					duration: distanceToLoop / pixelsPerSecond,
				},
				0
			)
				.fromTo(
					item,
					{
						xPercent: snap(
							((curX - distanceToLoop + totalWidth) / widths[i]) * 100
						),
					},
					{
						xPercent: xPercents[i],
						duration:
							(curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
						immediateRender: false,
					},
					distanceToLoop / pixelsPerSecond
				)
				.add('label' + i, distanceToStart / pixelsPerSecond);
			times[i] = distanceToStart / pixelsPerSecond;
		}
		function toIndex(index, vars) {
			vars = vars || {};
			Math.abs(index - curIndex) > length / 2 &&
				(index += index > curIndex ? -length : length); // always go in the shortest direction
			let newIndex = gsap.utils.wrap(0, length, index),
				time = times[newIndex];
			if (time > tl.time() !== index > curIndex) {
				// if we're wrapping the timeline's playhead, make the proper adjustments
				vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
				time += tl.duration() * (index > curIndex ? 1 : -1);
			}
			curIndex = newIndex;
			vars.overwrite = true;
			return tl.tweenTo(time, vars);
		}
		tl.next = (vars) => toIndex(curIndex + 1, vars);
		tl.previous = (vars) => toIndex(curIndex - 1, vars);
		tl.current = () => curIndex;
		tl.toIndex = (index, vars) => toIndex(index, vars);
		tl.times = times;
		tl.progress(1, true).progress(0, true); // pre-render for performance
		if (config.reversed) {
			tl.vars.onReverseComplete();
			tl.reverse();
		}
		return tl;
	}
	// Create array of elements to tween on
	const boxes = gsap.utils.toArray('.SI');

	// Setup the tween
	const loop = horizontalLoop(boxes, {
		paused: true, // Sets the tween to be paused initially
		repeat: -1, // Makes sure the tween runs infinitely
		duration: 1, // Animation duration
		ease: 'power2.out', // Smooth easing
	});

	// Start the tween
	loop.play(); // Call to start playing the tween

	// var swiper = new Swiper('.SliderAnimation', {
	// 	slidesPerView: 4, // Always show 4 slides
	// 	spaceBetween: 20, // Adjust spacing between slides
	// 	loop: true, // Infinite loop
	// 	freeMode: true, // Continuous smooth scrolling
	// 	autoplay: {
	// 		delay: 0, // No delay between slides
	// 		disableOnInteraction: false, // Keep autoplay even when user interacts
	// 	},
	// 	speed: 3000, // Adjust speed for smoothness
	// 	loopAdditionalSlides: 4, // Preload extra slides to prevent flickering
	// 	allowTouchMove: false, // Prevent manual dragging for perfect smoothness
	// });

	// var swiper = new Swiper('.SliderAnimation', {
	// 	slidesPerView: 3,
	// 	loop: true,
	// 	centeredSlides: true,
	// 	spaceBetween: 30,
	// 	pagination: {
	// 		el: '.swiper-pagination',
	// 		clickable: true,
	// 	},
	// 	speed: 1000,
	// 	autoplay: {
	// 		delay: 0,
	// 		enabled: true,
	// 	},
	// });

	// var swiper = new Swiper('.SliderAnimation', {
	// 	slidesPerView: 'auto',
	// 	spaceBetween: 80,
	// 	loop: true,
	// 	speed: 6000,
	// 	allowTouchMove: false,
	// 	autoplay: {
	// 		delay: 1,
	// 		disableOnInteraction: false,
	// 	},
	// });

	// Text content animation
	gsap.from('.content', {
		scrollTrigger: {
			trigger: '.content',
			start: 'top 85%',
			toggleActions: 'play none none reverse',
		},
		opacity: 0,
		y: 30, // Slide in from below
		duration: 1,
		stagger: 0.3, // Stagger the animation for each line
		ease: 'power3.out',
	});

	// Animate work-title elements on every scroll
	// gsap.utils.toArray('.work-title').forEach((title) => {
	// 	gsap.fromTo(
	// 		title,
	// 		{ opacity: 1, y: 0 },
	// 		{
	// 			opacity: 0,
	// 			y: -50,
	// 			duration: 0.8,
	// 			ease: 'power2.inOut',
	// 			scrollTrigger: {
	// 				trigger: title,
	// 				start: 'top 20%',
	// 				end: 'top 0%',
	// 				toggleActions: 'play none none reverse',
	// 				scrub: 1,
	// 			},
	// 		}
	// 	);
	// });

	gsap.utils.toArray('.work-title').forEach((title) => {
		gsap.fromTo(
			title,
			{ opacity: 0, y: 50 },
			{
				opacity: 1,
				y: 0,
				duration: 1.5,
				ease: 'power2.inOut',
				scrollTrigger: {
					trigger: title,
					start: 'top 80%',
					end: 'top 50%',
					toggleActions: 'play none none play',
					scrub: 1,
				},
			}
		);
	});

	gsap.fromTo(
		'.work-img',
		{ opacity: 0, y: 50 },
		{
			opacity: 1,
			y: 0,
			duration: 1.5,
			ease: 'power2.inOut',
			scrollTrigger: {
				trigger: '.work-img',
				start: 'top 80%',
				end: 'top 50%',
				toggleActions: 'play none none play',
				scrub: 1,
			},
		}
	);
	gsap.fromTo(
		'.work-fs-4',
		{ opacity: 0, y: 50 },
		{
			opacity: 1,
			y: 0,
			duration: 1.5,
			ease: 'power2.inOut',
			scrollTrigger: {
				trigger: '.work-fs-4',
				start: 'top 80%',
				end: 'top 50%',
				toggleActions: 'play none none play',
				scrub: 1,
			},
		}
	);

	//   arrow icon on every scroll
	gsap.fromTo(
		'.arrow-icon',
		{ x: -100, scale: 0.5, opacity: 0 },
		{
			x: 0, // Move to original position
			scale: 1, // Zoom to normal size
			opacity: 1,
			duration: 1,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: '.arrow-icon',
				start: 'top 100%',
				end: 'top 10%',
				toggleActions: 'play none none reverse',
				scrub: 1,
			},
		}
	);

	gsap.fromTo(
		'.footer-logo, .footer-page, .footer-info, .footer-social li',
		{
			opacity: 0,
			y: 50, // Start from below
		},
		{
			opacity: 1,
			y: 0,
			duration: 1.5,
			// stagger: 0.02,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: '.footer',
				start: 'top 80%',
				end: 'top 50%',
				toggleActions: 'play none none play',
				scrub: 1,
			},
		}
	);

	let mySplitText = new SplitText('.split-stagger', { type: 'words,chars' });
	let chars = mySplitText.chars;

	chars.forEach((char, i) => {
		smoother.effects(char, { speed: 1, lag: (i + 1) * 0.1 });
	});

	// GSAP animation for news section items
	// gsap.fromTo(
	// 	'.card-item',
	// 	{
	// 		opacity: 0,
	// 		y: 50,
	// 	},
	// 	{
	// 		opacity: 1,
	// 		y: 0,
	// 		duration: 1,
	// 		stagger: 0.2,
	// 		ease: 'power2.out',
	// 		scrollTrigger: {
	// 			trigger: '.news',
	// 			start: 'top 80%',
	// 			end: 'top 30%',
	// 			toggleActions: 'play reverse play reverse',
	// 			scrub: true,
	// 			once: false,
	// 			markers: false,
	// 		},
	// 	}
	// );
});
