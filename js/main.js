    //Variables:
    //navbar
    const navbarMobile = document.querySelector('.navbar-mobile');
    const openNavbarMobile = document.querySelector('.navbar-button');
    const closeNavbarMobile = document.querySelector('.close-navbar-mobile');

    //projects slider
    const slideImageEl = document.querySelector('.slide-image');
    const slideImageTitleEl = document.querySelector('.slide-image-title'); 
    const prevSlideBtn = document.querySelector('.nav-left');
    const nextSlideBtn = document.querySelector('.nav-right');
    const slideImageTitle = [
        {
            'title': 'Lean Product Roadmap',
            'text': '2021 Project'
        },
        {
            'title': 'New Majestic Hotel',
            'text': '2020 Project'
        },
        {
            'title': 'Admin Dashboard',
            'text': '2019 Project'
        }
    ];

    let slideNum = 0;

    //Smooth Scroll Links
    const smoothDesktopLinks = document.querySelectorAll('.navbar-container .nav li a');
    const smoothMobileLinks = document.querySelectorAll('.navbar-mobile .nav-mobile li a');

    //Scroll Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');

    //Function: Open Mobile Navbar
    const openMobileNavbar = () => {
        navbarMobile.style.width = '300px';
        navbarMobile.style.pointerEvents = 'auto';
        closeNavbarMobile.style.display = 'block';
        document.querySelector('body').style.overflowY= 'hidden';
    };
    //Function: Close Mobile Navbar
    const closeMobileNavbar = () => {
        navbarMobile.style.width = 0;
        navbarMobile.style.pointerEvents = 'none';
        closeNavbarMobile.style.display = 'none';
        document.querySelector('body').style.overflowY = 'auto';
    };

    //Function: Show Slide
    const showSlide = () => {
        let deviceImage = null;
        let currentSlideText = null;

        if (window.innerWidth <= 767) {
            deviceImage = 'mobile';
        } else if (window.innerWidth > 767 && window.innerWidth < 1200) {
            deviceImage = 'tablet';
        } else if (window.innerWidth > 1200) {
            deviceImage = 'desktop';
        }

        //set match image
        deviceImage = `url(./images/${ deviceImage }/image-slide-${ slideNum }.jpg)`;
        slideImageEl.style.backgroundImage = deviceImage;
        //set title for image
        if (slideNum == 1) {
            currentSlideText = slideImageTitle[0];
        } else if (slideNum == 2) {
            currentSlideText = slideImageTitle[1];
        } else if (slideNum == 3) {
            currentSlideText = slideImageTitle[2];
        }

        slideImageTitleEl.innerHTML = `
            <h3>${ currentSlideText.title }</h3>
            <p>${ currentSlideText.text }</p>
        `;
    };

    //Function: Prev Slide
    const prevSlide = () => {
        slideNum --;
        if (slideNum < 1) {
            slideNum = 3;
        }
        showSlide(slideNum);
    };

    //Function: Next Slide
    const nextSlide = () => {
        slideNum ++;
        if (slideNum > 3) {
            slideNum = 1;
        }
        showSlide(slideNum);
    };

    const smooth = element => {
        const dataTarget = element.getAttribute('data-target');
        const elTarget = document.querySelector(dataTarget);
        const elTop = elTarget.offsetTop;
        
        window.scrollTo({
            top: elTop,
            left: 0,
            behavior: 'smooth'
        });
    };

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    const showHideScrollBtn = () => {
        const windowTop = window.pageYOffset;
        if (windowTop <= 100) {
            scrollTopBtn.style.display = 'none';
        } else {
            scrollTopBtn.style.display = 'block';
        }
    };

    //Event: Open Mobile Navbar
    openNavbarMobile.addEventListener('click', openMobileNavbar);
    //Event: Close Mobile Navbar
    closeNavbarMobile.addEventListener('click', closeMobileNavbar);

    //Event: Prev Slide
    prevSlideBtn.addEventListener('click', prevSlide);

    //Event: Next Slide
    nextSlideBtn.addEventListener('click', nextSlide);

    //Event: Smooth
    smoothMobileLinks.forEach(link => {
        link.addEventListener('click', e => {
            const element = e.currentTarget;
            if (!element.classList.contains('btn')) {
                e.preventDefault();
                smooth(element);
                closeMobileNavbar();
            }
        });
    });
    smoothDesktopLinks.forEach(link => {
        link.addEventListener('click', e => {
            const element = e.currentTarget;
            if (!element.classList.contains('btn')) {
                e.preventDefault();
                smooth(element);
            }
        });
    });

    //Event: Scroll Top
    scrollTopBtn.addEventListener('click', scrollTop);

    //Event: DOM Content Loaded
    document.addEventListener('DOMContentLoaded', () => {
        //show slide
        slideNum = 1;
        showSlide(slideNum);
    });

    //Event: Window Resize
    window.addEventListener('resize', () => {
        showSlide(slideNum);
    });

    //Event: Show Hide Scroll Btn
    window.addEventListener('scroll', showHideScrollBtn);