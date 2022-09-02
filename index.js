class DudeInfiniteSlider {
    constructor(
        slider,
        options = {}
    ) {
        this.slider = document.querySelector(slider);
        this.slider.classList.add('DudeInfiniteSlider');
        this.sliderChildren = 
            document.querySelector(slider).children;
        this.sliderItems = [...this.sliderChildren];
        this.sliderBodyWidth = null;
        this.sliderItemsWidth = this.sliderItems[0].offsetWidth;
        this.sliderItemsHeight = this.sliderItems[0].offsetHeight;
        this.options = options;
        this.numOfScreens = this.sliderItems.length;
        this.currentScreen = 0;
        this.inAnim = false;
        this.itemStyleDisplay = 
            getComputedStyle(this.sliderChildren[0]).display;
        this.start();
        this.animTime = this.options.animTime;
    }

    defaultStyles() { 
        this.slider.style.width = `${this.sliderItemsWidth}px`;
        this.slider.style.height = `${this.sliderItemsHeight}px`;
        this.slider.style.position = 'relative';
        this.slider.style.overflow = 'hidden';
        this.sliderBodyWidth = this.slider.offsetWidth;

        this.sliderItems.forEach(item => {
            item.style.position = 'absolute';
            item.style.top = '50%';
            if(getComputedStyle(this.sliderChildren[0]).display === 'list-item') {
                this.itemStyleDisplay = 'block';
            }
        });
    }

    defaultValues() {

        let {
            btnLeft,
            btnRight,
            stopAutoScrollWhenMouseOnElement
        } = this.options;
    

        let defaultValue = {
            btnLeft: false,
            btnRight: false,
            animTime: 500,
            autoScroll: false,
            autoScrollTime: 3000,
            stopAutoScrollWhenMouseOnElement: '.DudeInfiniteSlider' 
        };

        if(!btnLeft && !btnRight) {
            defaultValue.autoScroll = true;
        }

        if(stopAutoScrollWhenMouseOnElement === true) {
            this.options.stopAutoScrollWhenMouseOnElement = 
                '.DudeInfiniteSlider'; 
        }

        for(let key in defaultValue) {
            if(this.options[key] === undefined) {
                this.options[key] = defaultValue[key];
            }  
        }
        // console.log(this.options);
    }

    start() {
        this.defaultStyles();
        this.defaultValues();

        this.sortPositioning(
            this.sliderItems[this.currentScreen],
            this.sliderItems[this.currentScreen - 1],
            this.sliderItems[this.currentScreen + 1]
        );
    
        this.arrowRightClick();

        this.arrowLeftClick();

        this.autoScroll();
    }

    autoScroll() {
        let {autoScroll} = this.options;
        let {autoScrollTime} = this.options;
        let {stopAutoScrollWhenMouseOnElement} = this.options;
        const onThatEl = 
            document.querySelector(stopAutoScrollWhenMouseOnElement);

        if(autoScroll) {
            let autoWipe = setInterval(()=> {
                this.startAnim('right');
            },  autoScrollTime);

            if(stopAutoScrollWhenMouseOnElement) {
                onThatEl.addEventListener('mouseenter', ()=> {
                    clearInterval(autoWipe);
                });
    
                onThatEl.addEventListener('mouseleave', ()=> {
                    clearInterval(autoWipe);
                        autoWipe = setInterval(()=> {
                            this.startAnim('right');
                    }, autoScrollTime);
                });
            }
            
        }
    }

    arrowRightClick() {
        let {btnRight}  = this.options;
        const arrowRight = document.querySelector(btnRight);

        if(arrowRight) {
            arrowRight.addEventListener('click', ()=> {
                this.startAnim('right');
            });
        }
       
    }

    arrowLeftClick() {
        let {btnLeft}  = this.options;
        const arrowLeft = document.querySelector(btnLeft);

        if(arrowLeft) {
            arrowLeft.addEventListener('click', ()=> {
                this.startAnim('left');
            });
        }
    }

    sortPositioning(mainScreen, leftScreen, rightScreen) {

    
        if (rightScreen === undefined) {
            rightScreen = this.sliderItems[0];
        }

        if(leftScreen === undefined) {
            leftScreen = this.sliderItems[this.numOfScreens - 1];
        }

        this.sliderItems.forEach(item => {
            item.style.transform = this.calculationTransformTranslate();
            if (item === mainScreen) {
                item.style.display = `${this.itemStyleDisplay}`;
                item.style.left = '0%';
            }else if (item === leftScreen) {
                item.style.display = `${this.itemStyleDisplay}`;
                item.style.left = '-100%';
            }else if (item === rightScreen) {
                item.style.display = `${this.itemStyleDisplay}`;
                item.style.left = '100%';
            }else {
                item.style.display = 'none';
            }
        });
    }

    startAnim(direction) {
        if(!this.inAnim) {
            this.inAnim = true;
            if(direction === 'right') {
                this.moveRight();
            }else if (direction === 'left') {
                this.moveLeft();
            }else {
                this.inAnim = false;
                return;
            }
        }
    }

    moveRight() {
        if(this.currentScreen < this.numOfScreens - 1) {
            this.toLeft(this.sliderItems[this.currentScreen]);
            this.comeRight(this.sliderItems[this.currentScreen + 1]);
            setTimeout(()=> {
                this.inAnim = false;
                this.currentScreen++;
                this.sortPositioning(
                    this.sliderItems[this.currentScreen], 
                    this.sliderItems[this.currentScreen - 1], 
                    this.sliderItems[this.currentScreen + 1]
                );
            }, this.animTime);
        }else {
            this.toLeft(this.sliderItems[this.currentScreen]);
            this.comeRight(this.sliderItems[0]);
            setTimeout(()=> {
                this.inAnim = false;
                this.currentScreen = 0;
                this.sortPositioning(
                    this.sliderItems[this.currentScreen], 
                    this.sliderItems[this.currentScreen - 1], 
                    this.sliderItems[this.currentScreen + 1]
                );
            }, this.animTime);
        }
    }

    moveLeft() {
        if(this.currentScreen > 0) {
            this.toRight(this.sliderItems[this.currentScreen]);
            this.comeLeft(this.sliderItems[this.currentScreen - 1]);
            setTimeout(()=> {
                this.inAnim = false;
                this.currentScreen--;
                this.sortPositioning(
                    this.sliderItems[this.currentScreen], 
                    this.sliderItems[this.currentScreen - 1], 
                    this.sliderItems[this.currentScreen + 1]
                );
            }, this.animTime);
        }else {
            this.toRight(this.sliderItems[this.currentScreen]);
            this.comeLeft(this.sliderItems[this.numOfScreens - 1]);
            setTimeout(()=> {
                this.inAnim = false;
                this.currentScreen = this.numOfScreens - 1;
                this.sortPositioning(
                    this.sliderItems[this.currentScreen], 
                    this.sliderItems[this.currentScreen - 1], 
                    this.sliderItems[this.currentScreen + 1]
                );
            }, this.animTime);
        }
    }


    calculationTrtransition() {
        let styleTransition;
        let RoundingAnimTime = Math.round(this.animTime / 100) * 100;

        if(this.animTime <= 999) {
            styleTransition = `.${RoundingAnimTime / 100}s`;
        }else if (this.animTime > 999) {
            styleTransition = `${Math.floor(RoundingAnimTime / 999)}s`;
        }
        return  styleTransition;
    }

    calculationTransformTranslate(checkNegativeValue) {
    
        let transformTranslate = 
            (this.sliderBodyWidth - this.sliderItemsWidth) / 2;

            if (checkNegativeValue === 'minus') {
                return `translate(${-transformTranslate}%, -50%)`;
            }

        return `translate(${transformTranslate}px, -50%)`;
    }

    toLeft(screen) {
        screen.style.transition = this.calculationTrtransition();
        screen.style.left = '-100%';

        setTimeout(() => {
            screen.style.transition = '';
            screen.style.left = '';
        }, this.animTime);
    }

    toRight(screen) {
        screen.style.transition = this.calculationTrtransition();
        screen.style.left = '100%';
        setTimeout(() => {
        screen.style.transition = '';
        screen.style.left = '';
        }, this.animTime);
    }

    comeRight(screen) {
        screen.style.transition = this.calculationTrtransition();
        screen.style.left = '0%';
        setTimeout(() => {
            screen.style.transform = ''; 
            screen.style.left = '';
        }, this.animTime);
    }

    comeLeft(screen) {
        screen.style.transition = this.calculationTrtransition();
        screen.style.left = '0%';
        setTimeout(() => {
            screen.style.transition = '';
            screen.style.left = '';
        }, this.animTime);
    }

}



const slider = new DudeInfiniteSlider(
    '#slider',
    {
        btnLeft: '.btn .left',
        btnRight: '.btn .right',
    }
);


const slider2 = new DudeInfiniteSlider(
    '#slider2',
    {
        btnLeft: '.btn .left',
        btnRight: '.btn .right',
    }
);


