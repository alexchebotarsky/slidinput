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

- Add `.js` file somewhere after **your jQuery** file

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

- **Success!** Your input does not look boring anymore :)

## How to customize?

You can pass an object with options to the function, like that:

```javascript
$('.myInput').slidinput({
  mode: 'middle',
  offsetX: -25,
  offsetY: 10,
  scaling: 0.4
});
```

These are **default** options:

```javascript
const defs = {
  // Available: 'centered', 'above', 'middle', 'regular'
  mode: 'centered',

  // Placeholder `translateY` on slide, from it's mode default position
  offsetY: 0,

  // Placeholder `translateX` on slide, from it's mode default position
  offsetX: 0,

  // CSS scale parameter on slide
  scaling: 0.7
};
```

## How to destroy?

It is as simple as to init, just pass string `'destory'` to the function as follows:

```javascript
$('.myInput').slidinput('destroy');
```

## Tips

- You can **customize** your input using **CSS classes** given by the plugin, for instance: `.filled`, `.focused`, `.mode-centered`, etc.

- You should add `height` and `width` right to the **input** (not plugin's wrapper). The plugin will do the **magic** for you! :)

- If you add `text-align: center` to your input, the plugin will **detect** it and make placeholder **centered**.
