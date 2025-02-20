/* Main Js Start */

(function ($) {
	'use strict';

	$(document).ready(function () {
		// odometer init
		if ($('.odometer').length) {
			var odo = $('.odometer');
			odo.each(function () {
				$(this).appear(function () {
					var countNumber = $(this).attr('data-count');
					$(this).html(countNumber);
				});
			});
		}

		// sticky header
		$(window).on('scroll', function () {
			if ($(window).scrollTop() >= 60) {
				$('.header').addClass('fixed-header');
			} else {
				$('.header').removeClass('fixed-header');
			}
		});

		new WOW().init();
		var swiper = new Swiper('.mySwiper', {
			loop: true,
			spaceBetween: 10,
			slidesPerView: 3,
			freeMode: true,
			watchSlidesProgress: true,
		});
		var swiper2 = new Swiper('.mySwiper2', {
			loop: true,
			spaceBetween: 100,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			thumbs: {
				swiper: swiper,
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

	// Subtitle animation
	gsap.from('.section-subtitle', {
		scrollTrigger: {
			trigger: '.section-subtitle',
			start: 'top 85%',
			toggleActions: 'play none none reverse',
		},
		opacity: 0,
		y: 50, // Slide in from below
		duration: 1.2,
		delay: 0.3, // Delay for better timing with the title
		ease: 'power2.out',
	});

	// Profile image animation
	gsap.from('.my-profile-wrap', {
		scrollTrigger: {
			trigger: '.my-profile-wrap',
			start: 'top 85%',
			toggleActions: 'play none none reverse',
		},
		opacity: 0,
		scale: 0.8, // Start with a smaller scale
		duration: 1.5,
		ease: 'elastic.out(1, 0.5)', // Elastic bounce effect
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
});
