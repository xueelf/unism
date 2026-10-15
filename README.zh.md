# Unism

本项目是一个可以为原生 HTML 元素在不同浏览器环境下，提供统一现代化外观的轻量级样式库。使用纯 CSS 编写，没有任何 JavaScript 代码。

使用其他语言阅读：[English](./README.md) | 简体中文

## 介绍

这个项目可以用来做什么？

我们都知道，在前端开发中，很多开发人员都会选择使用 UI 组件库来编写页面。

如果使用 Vue，你可能会选择 Element Plus。如果是 React，则会选择 Ant Design。而 Angular 有着 Material UI。但有一个问题，如果我们只是想写一个简单的静态页面，这时该怎么办？总不能为了一个静态 HTML 页面，就将项目接入整套 Web 框架吧？

这个时候，聪明的你肯定想到了 [Tailwind CSS](https://tailwindcss.com/)、[UnoCSS](https://unocss.dev/) 等优秀的项目。没错，我以前也是基于这类方案进行页面开发。可是，对于我们这类小型页面来说，它们还是显得有些「重」。

例如使用 Tailwind CSS 这样的原子化 CSS 工具时，一个按钮可能会写成这样：

```html
<button
  class="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800"
>
  创建项目
</button>
```

仅仅是一个基础按钮，就已经写出了这么一长串 `class`。如果再加上悬停、禁用状态和响应式规则，样式声明还会继续增加。这样一来，当页面元素随着布局越来越复杂时，HTML 代码也会变得不可读。

那有没有办法，把这些样式整理成一个类名？当然有，例如最近几年兴起的 [daisyUI](https://daisyui.com/)：

```html
<button class="btn">创建项目</button>
```

这次确实简洁了很多，但还是需要为每个按钮添加 `btn`，而且 daisyUI 通常作为 Tailwind CSS 插件使用。

那么，Unism 是怎么做的？

```html
<button>创建项目</button>
```

这就完了？没错，不需要任何组件类名，样式直接作用于 HTML 标签，同时支持通过 CSS 变量自定义。按钮仍然是 `<button>`，输入框仍然是 `<input>`，照常使用它们的原生属性就可以了。

## 引入

### npm

```shell
npm install unism
```

在支持 npm 包解析的构建工具中，从 CSS 入口引入：

```css
@import 'unism';
```

### CDN

使用 CDN（内容分发网络）加载样式，无需安装依赖。以下示例使用面向 npm 包的 CDN 服务 [esm.sh](https://esm.sh)：

```html
<link rel="stylesheet" href="https://esm.sh/unism/dist/index.css" />
```

你也可以根据自己的喜好来使用其它 CDN，例如 [jsDelivr](https://www.jsdelivr.com/) 和 [UNPKG](https://unpkg.com/) 等。

## 使用

以下示例使用原生 HTML 实现表单对话框和必填校验。点击「创建项目」打开表单，填写项目信息并提交后关闭对话框：

```html
<button type="button" commandfor="project" command="show-modal">
  创建项目
</button>

<dialog id="project" aria-label="创建项目">
  <form method="dialog">
    <label>项目名称<input name="name" required /></label>
    <label>计划开始时间<input type="datetime-local" name="start" /></label>

    <button type="submit">创建</button>
    <button type="reset">重置</button>
    <button type="submit" formnovalidate>取消</button>
  </form>
</dialog>
```

你可以试着不填写名称，直接点击「创建」，会触发表单的必填校验。点击「重置」可以清空输入，点击「取消」则直接关闭弹窗。

## 设计理念

回头看看上面的弹窗示例，细心的你是不是已经发现了，我们一行 JavaScript 都没写？

如果使用普通 `<div>` 封装弹窗，就需要自己处理显示、关闭、焦点和遮罩等行为。而 HTML 本身已经提供了 [`<dialog>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dialog)，配合按钮的 `commandfor` 和 `command`，就可以让浏览器处理这些交互。

类似的场景还有很多。例如，我们想写一段可以展开、收起的项目介绍，可能会先写一个按钮，再放一个默认隐藏的容器：

```html
<button type="button" aria-expanded="false" aria-controls="description">
  项目介绍
</button>

<div id="description" hidden>
  <p>使用原生 HTML 元素构建页面。</p>
</div>
```

接下来呢？还得编写点击事件，同步内容的 `hidden` 状态和按钮的 `aria-expanded`。但如果使用原生 [`<details>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/details) 和 `<summary>`：

```html
<details>
  <summary>项目介绍</summary>
  <p>使用原生 HTML 元素构建页面。</p>
</details>
```

展开、收起、键盘操作和对应的辅助技术状态，都交给浏览器处理。这些能力，HTML 本身就已经提供了。

如果有对应的 HTML 标签，就尽量使用已有的原生能力，这便是 Unism 的设计理念。但不同浏览器的默认样式各有各的风格，normalize.css 这类项目也不提供统一、可自定义的视觉样式。所以，我想在保留原生能力的同时，统一这些标签的外观，这成为了开发这个项目的契机。

## 自定义样式

Unism 的主题色默认为蓝色（`#2563eb`）。如果想更换，可以设置 `--accent-color`，链接、选中控件和进度条等元素会使用这个配色。具体元素也有自己的变量，例如 `--button-border-radius` 控制按钮圆角：

```css
:root {
  --accent-color: #0f766e;
  --button-border-radius: 0.5rem;
  --input-padding: 0.75rem 1rem;
}
```

变量名由标签名或属性名和完整的 CSS 属性名组成，例如 `--button-border-radius`。在 `:root` 上设置变量会影响整个页面，也可以在容器或单个元素上设置，调整局部样式。

默认配色跟随系统的明暗模式。通过 `color-scheme: light` 或 `color-scheme: dark` 可以指定页面或局部区域的模式。自定义颜色时，使用 `light-dark(浅色值, 深色值)` 分别指定两种模式的颜色。

## 按需引入

如果页面只用到了按钮和选择框，也可以只引入对应的样式：

```css
@import 'unism/button.css';
@import 'unism/select.css';
```

## 浏览器支持

Unism 面向最新版本的 Chrome、Firefox 和 Safari。交互示例还需要浏览器支持相应的 HTML 元素和属性。

日期、颜色和文件选择器的系统面板，以及选择框的下拉面板和选项，保留浏览器与操作系统提供的原生样式。
