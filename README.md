# slidinput

jQuery library for customizing and animating input's placeholder, label

## See [demo](https://goodleby.github.io/slidinput/demo/) for visual examples

## How to install?

- Add css file to `head`

  ```html
  <link href="yourPath/jquery.slidinput.min.css" rel="stylesheet" />
  ```

- Add js file somewhere after jQuery file

  ```html
  <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

  <script src="yourPath/jquery.slidinput.min.js"></script>
  ```

## How to use?

- Firstly, we need an **input with placeholder** we want to work with

```html
<input type="text" placeholder="Your name" class="myInput" />
```

- Secondly, we need to **init it** using javascript

```javascript
$('.myInput').slidinput();
```

- **Success!** Your input is not looking boring anymore :)

## How to customize?

You can pass an object with options to the function:

```javascript
$('.myInput').slidinput({
  mode: 'above'
});
```

These are default options:

```javascript
const defs = {
  // Available: 'centered', 'above', 'regular'
  mode: 'centered',

  // Distance between input's text and sliding placeholder in px
  placeholderPadding: 0,

  // CSS scale parameter on slide
  scaling: 0.7
};
```

_**Tip:** You can also customize in CSS using classes given by the library._
