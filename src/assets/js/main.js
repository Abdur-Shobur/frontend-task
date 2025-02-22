/* Main Js Start */

(function ($) {
	'use strict';

	$(document).ready(function () {
		// sticky header
		$(window).on('scroll', function () {
			if ($(window).scrollTop() >= 60) {
				$('.header').addClass('fixed-header');
			} else {
				$('.header').removeClass('fixed-header');
			}
		});

		new WOW().init();
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

					// Reset all elements before animation
					gsap.set(activeSlide.querySelector('.title'), { opacity: 0, y: 50 });
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
			},
		});
	});
})(jQuery);

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
				trigger: content, // Element to watch
				start: 'top 90%', // Trigger animation when the top of the element reaches 80% of the viewport height
				toggleActions: 'play none none reverse', // Actions: onEnter, onLeave, onEnterBack, onLeaveBack
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
	gsap.utils.toArray('.work-title').forEach((title) => {
		gsap.fromTo(
			title,
			{ opacity: 1, y: 0 },
			{
				opacity: 0,
				y: -50,
				duration: 0.8,
				ease: 'power2.inOut',
				scrollTrigger: {
					trigger: title,
					start: 'top 20%',
					end: 'top 0%',
					toggleActions: 'play none none reverse',
					scrub: 1,
				},
			}
		);
	});

	gsap.fromTo(
		'.work-img',
		{ opacity: 1, y: 0 },
		{
			opacity: 0,
			y: -50,
			duration: 0.8,
			ease: 'power2.inOut',
			scrollTrigger: {
				trigger: '.work-img',
				start: 'top 20%',
				end: 'top 0%',
				toggleActions: 'play none none reverse',
				scrub: 1,
			},
		}
	);
	gsap.fromTo(
		'.work-fs-4',
		{ opacity: 1, y: 0 },
		{
			opacity: 0,
			y: -50,
			duration: 0.8,
			ease: 'power2.inOut',
			scrollTrigger: {
				trigger: '.work-fs-4',
				start: 'top 20%',
				end: 'top 0%',
				toggleActions: 'play none none reverse',
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
			// stagger: 0.02, // Stagger the animation for the elements
			ease: 'power2.out',
			scrollTrigger: {
				trigger: '.footer',
				start: 'top 80%', // Trigger when the footer section is 80% from the top of the viewport
				end: 'top 50%', // End when the footer is 30% from the top
				toggleActions: 'play none none play', // Trigger the animation on entering and reversing it on leave
				scrub: 1,
			},
		}
	);

	// GSAP animation for news section items
	gsap.fromTo(
		'.card-item',
		{
			opacity: 0, // Start as invisible
			y: 50, // Start below the original position
		},
		{
			opacity: 1, // Fade in
			y: 0, // Move to original position
			duration: 1,
			stagger: 0.2, // Stagger the animation for each item
			ease: 'power2.out',
			scrollTrigger: {
				trigger: '.news', // Trigger is the .news section
				start: 'top 80%', // Animation starts when 80% of the section enters the viewport
				end: 'top 30%', // Animation ends when 30% of the section is in the viewport
				toggleActions: 'play reverse play reverse', // Play when scrolling down, reverse when scrolling up
				scrub: true, // Make the animation scroll synced
				once: false, // Allow it to trigger every time the section comes into view
				markers: false, // Disable markers for easier debugging
			},
		}
	);
});
