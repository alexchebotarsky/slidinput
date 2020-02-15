# slidinput

Lightweight jQuery plugin for creating custom animated **placeholders** using **native** `placeholder` attribute.

See 💥[demo](https://goodleby.github.io/slidinput/demo/)💥 for visual examples.

Make **any** input **user-friendly** and enchance any form using _slidinput_ plugin.

This feature is also known as **float label pattern** or **Material design/iOS styled** inputs.

Simply activate on input field with placeholder and it will **slide** it's text on **focus** and **typing**.

The plugin is using **CSS transitions** to do **flow up effect** and make label **"fly"** on **click**.

## How to install?

- Add `.css` file to `head` tag

  ```html
  <link href="yourPath/jquery.slidinput.min.css" rel="stylesheet" />
  ```

- Add `.js` file somewhere after your jQuery file

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

These are **default** options:

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

_**Tip:** You can also customize it using CSS classes given by the plugin._
