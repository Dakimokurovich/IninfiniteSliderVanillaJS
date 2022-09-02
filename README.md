# DudeInfiniteSlider
## Infinite slider plugin

### HTML
```html
    <div id="slider">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>

   <!-- OR -->

   <div class="slider">
      <div>1</div>
      <div>2</div>
      <div>3</div>
   </div>
```
---
### JavaScript
```JS
const slider = new DudeInfiniteSlider('#slider');
```
>Also DudeInfiniteSlider takes a settings object

```JS
const slider = new DudeInfiniteSlider(
    '#slider',
    {
        // DEFAULT VALUES
        btnLeft: false, // -> '.btnLeft' or '#btnLeft'
        btnRight: false, // -> '.btnRight' or '#btnRight'
        animTime: 500, // -> ANIMATION TIME IN MILLISECOND
        autoScroll: false, // -> true
        autoScrollTime: 3000, // -> AUTI SCROLL TIME IN MILLISECOND
        stopAutoScrollWhenMouseOnElement: '#slider' // -> false
    }
);
```

>if "btnLeft" and "btnRight" are not assigned then "autoScroll: true". Can be forced to turn off "autoScroll: false"

## Example

```html
<!-- HTML -->

<div class="wrap">
    <ul id="slider">
        <li class="slider-item">1</li>
        <li class="slider-item">2</li>
        <li class="slider-item">3</li>
        <li class="slider-item">4</li>
    </ul>
</div>

<div class="btn">
    <button class="left">left</button>
    <button class="right">right</button>
</div>
```

```JavaScript
// JavaScript

    const slider = new DudeInfiniteSlider(
    '#slider',
    {
        btnLeft: '.btn .left',
        btnRight: '.btn .right',
        stopAutoScrollWhenMouseOnElement: '.wrap'

    }
);
```