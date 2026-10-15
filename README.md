# Unism

This project is a lightweight style library that gives native HTML elements a consistent, modern appearance across browsers. It is written entirely in CSS and contains no JavaScript.

Read in other languages: English | [简体中文](./README.zh.md)

## Introduction

What can you use this project for?

As we all know, many frontend developers choose UI component libraries to build pages.

If you use Vue, you might choose Element Plus. For React, you might choose Ant Design. Angular has Material UI. But here's a question: what if we just want to build a simple static page? Surely we don't need to bring in an entire web framework for one static HTML page?

You've probably already thought of excellent projects like [Tailwind CSS](https://tailwindcss.com/) and [UnoCSS](https://unocss.dev/). That's right, I've used these approaches to build pages myself. But for small pages like ours, they still feel a little "heavy".

For example, when using a utility-first CSS tool like Tailwind CSS, a button might look like this:

```html
<button
  class="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800"
>
  Create project
</button>
```

Even a basic button already has a long list of `class` names. Add styles for hover, disabled states, and responsive layouts, and the list keeps growing. As the page layout becomes more complex and the number of elements increases, the HTML becomes unreadable.

Is there a way to put these styles behind a single class? Of course. One example is [daisyUI](https://daisyui.com/), which has gained popularity in recent years:

```html
<button class="btn">Create project</button>
```

That's much shorter, but each button still needs `btn`, and daisyUI is typically used as a Tailwind CSS plugin.

So, how does Unism do it?

```html
<button>Create project</button>
```

That's it? That's right: no component classes are needed, styles apply directly to HTML tags, and you can customize them with CSS variables. A button is still a `<button>`, an input is still an `<input>`, and you can use their native attributes as usual.

## Installation

### npm

```shell
npm install unism
```

With a build tool that supports npm package resolution, import it from your CSS entry point:

```css
@import 'unism';
```

### CDN

Use a CDN (content delivery network) to load the stylesheet without installing dependencies. This example uses [esm.sh](https://esm.sh), a CDN service for npm packages:

```html
<link rel="stylesheet" href="https://esm.sh/unism/dist/index.css" />
```

You can also use whichever CDN you prefer, such as [jsDelivr](https://www.jsdelivr.com/) or [UNPKG](https://unpkg.com/).

## Usage

The following example uses native HTML for a form dialog and required-field validation. Click "Create project" to open the form, fill in the project details, and submit to close the dialog:

```html
<button type="button" commandfor="project" command="show-modal">
  Create project
</button>

<dialog id="project" aria-label="Create project">
  <form method="dialog">
    <label>Project name<input name="name" required /></label>
    <label>
      Planned start time
      <input type="datetime-local" name="start" />
    </label>

    <button type="submit">Create</button>
    <button type="reset">Reset</button>
    <button type="submit" formnovalidate>Cancel</button>
  </form>
</dialog>
```

Try clicking "Create" without entering a name to trigger the form's required-field validation. Click "Reset" to clear the inputs, or "Cancel" to close the dialog directly.

## Design philosophy

Look back at the dialog example above. Have you noticed that we haven't written a single line of JavaScript?

If you build a dialog with a plain `<div>`, you have to handle opening, closing, focus, and the backdrop yourself. HTML already provides [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog). Combined with the button's `commandfor` and `command` attributes, it lets the browser handle these interactions.

There are many similar situations. For example, if we want a project description that expands and collapses, we might start with a button and a container that's hidden by default:

```html
<button type="button" aria-expanded="false" aria-controls="description">
  Project description
</button>

<div id="description" hidden>
  <p>Build pages with native HTML elements.</p>
</div>
```

What comes next? We still need to write a click handler to keep the content's `hidden` state and the button's `aria-expanded` attribute in sync. But if we use the native [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) and `<summary>` elements:

```html
<details>
  <summary>Project description</summary>
  <p>Build pages with native HTML elements.</p>
</details>
```

The browser handles expanding, collapsing, keyboard interaction, and the state exposed to assistive technology. HTML already provides all of this.

When an HTML tag exists for the job, use its native capabilities wherever possible. That's Unism's design philosophy. But each browser has its own default styles, and projects like normalize.css don't provide a consistent, customizable appearance. I wanted to preserve those native capabilities while giving the tags a consistent look. That's what led me to develop this project.

## Customization

Unism's default accent color is blue (`#2563eb`). Set `--accent-color` to change it for links, checked controls, progress bars, and other elements. Individual elements also have their own variables. For example, `--button-border-radius` sets the button's border radius:

```css
:root {
  --accent-color: #0f766e;
  --button-border-radius: 0.5rem;
  --input-padding: 0.75rem 1rem;
}
```

Variable names combine the tag or attribute name with the full CSS property name, such as `--button-border-radius`. Set variables on `:root` to affect the whole page, or on a container or individual element to customize a smaller area.

Colors follow the system's light or dark mode by default. Use `color-scheme: light` or `color-scheme: dark` to set the mode for a page or section. Use `light-dark(light-value, dark-value)` to specify custom colors for both modes.

## Individual stylesheets

If your page only uses buttons and select controls, you can import just their styles:

```css
@import 'unism/button.css';
@import 'unism/select.css';
```

## Browser support

Unism targets the latest versions of Chrome, Firefox, and Safari. Interactive examples also require browser support for the HTML elements and attributes they use.

System pickers for date, color, and file inputs, along with select dropdown panels and options, retain the native appearance provided by the browser and operating system.
