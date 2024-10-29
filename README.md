![Felte](./packages/site/public/felte-logo-thin.png)

# Felte: A form library for Svelte, Solid and React

[![Tests](https://github.com/pablo-abc/felte/workflows/Tests/badge.svg)](https://github.com/pablo-abc/felte/actions/workflows/test.yml)
[![Bundle size](https://img.shields.io/bundlephobia/min/felte)](https://bundlephobia.com/result?p=felte)
[![NPM Version](https://img.shields.io/npm/v/felte)](https://www.npmjs.com/package/felte)
[![codecov](https://codecov.io/gh/pablo-abc/felte/branch/main/graph/badge.svg?token=T73OJZ50LC)](https://codecov.io/gh/pablo-abc/felte)
[![Follow Felte on Twitter](https://img.shields.io/twitter/follow/feltejs?style=social)](https://twitter.com/feltejs)
[![Follow Pablo on Twitter](https://img.shields.io/twitter/follow/Pablo_ABC?style=social)](https://twitter.com/Pablo_ABC)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-30-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Felte is a simple to use form library for Svelte, Solid and React. No `Field` or `Form` components are needed, just plain stores and actions to build your form however you like. You can see it in action in this [CodeSandbox demo](https://codesandbox.io/s/felte-demo-wce2h?file=/App.svelte)!

## Features

- Single action to make your form reactive.
- Use HTML5 native elements to create your form. (Only the `name` attribute is necessary).
- Provides stores and helper functions to handle more complex use cases.
- No assumptions on your validation strategy. Use any validation library you want or write your own strategy.
- Handles addition and removal of form controls during runtime.
- Official solutions for error reporting using `reporter` packages.
- Well tested. Currently at [99% code coverage](https://app.codecov.io/gh/pablo-abc/felte) and constantly working on improving test quality.
- Supports validation with [yup](./packages/validator-yup), [zod](./packages/validator-zod), [superstruct](./packages/validator-superstruct) and [vest](./packages/validator-vest).
- Easily [extend its functionality](https://felte.dev/docs/svelte/extending-felte).

## Simple usage example

### Svelte

```html
<script>
  import { createForm } from 'felte';

  const { form } = createForm({
    onSubmit: async (values) => {
      /* call to an api */
    },
  });
</script>

<form use:form>
  <input type="text" name="email" />
  <input type="password" name="password" />
  <button type="submit">Sign In</button>
</form>
```

### Solid

```jsx
import { createForm } from '@felte/solid';

function Form() {
  const { form } = createForm({
    onSubmit: async (values) => {
      /* call to an api */
    },
  });

  return (
    <form use:form={form}>
      <input type="text" name="email" />
      <input type="password" name="password" />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

> [!IMPORTANT]
>
> To use the `use-*` directive on **Solid**. [You need to extend the JSX namespace](https://docs.solidjs.com/reference/jsx-attributes/use#use). For example:

```dts
// src/global.d.ts
declare global {
  declare module "solid-js" {
    namespace JSX {
      interface Directives {
        form: (node: HTMLFormElement) => void;
      }
    }
  }
}
```

### React/Preact

```jsx
import { useForm } from '@felte/react';
// if using preact, use `@felte/preact`

function Form() {
  const { form } = useForm({
    onSubmit: async (values) => {
      /* call to an api */
    },
  });

  return (
    <form ref={form}>
      <input type="text" name="email" />
      <input type="password" name="password" />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

### Vue

```html
<script setup>
  import { useForm } from '@felte/vue';

  const { vForm } = useForm({
    onSubmit: async (values) => {
      /* call to an api */
    },
  });
</script>
<template>
  <form v-form>
    <input type="text" name="email" />
    <input type="password" name="password" />
    <button type="submit">Sign In</button>
  </form>
</template>
```

### VanillaJS with Web Components

```html
<script type="module">
  import 'https://unpkg.com/@felte/element@0.4.0/dist/min/felte-form.js';
  const felteForm = document.querySelector('felte-form');

  felteForm.configuration = {
    onSubmit: async (values) => {
      console.log(values);
    },
  };
</script>

<felte-form>
  <form>
    <input type="text" name="email" />
    <input type="password" name="password" />
    <button type="submit">Sign In</button>
  </form>
</felte-form>
```

> This example works without a bundler! Copy its contents to an HTML file and open it on your browser. A more complete example like this, with validation and error reporting, can be found [here](./examples/web-component/cdn).

## More examples

You can find fully functional examples on the [/examples](./examples) directory of this repository. You should be able to open them on CodeSandbox by replacing github's url to `githubbox`. E.g. Replace `https://github.com/pablo-abc/felte/tree/main/examples/svelte/basic` with `https://githubbox.com/pablo-abc/felte/tree/main/examples/svelte/basic`.

## Packages

This repository is a mono-repo containing multiple packages located in the `packages` directory. Maintained using [pnpm](https://pnpm.io) and [Changesets](https://github.com/atlassian/changesets).

### Svelte

We provide two packages that are specific to Svelte:

#### [felte](./packages/felte)

This is the core package that contains all the basic functionality you need to handle your forms in Svelte. Felte optionally allows you to use error reporters (see them as plugins) to prevent you from needing to find a way to display your errors on your form manually. For this we provide already some reporter packages contained in this same repo.

#### [@felte/reporter-svelte](./packages/reporter-svelte)

A reporter package that uses a Svelte component to pass the validation messages for you to display. This provides an API that might feel the most familiar to most developers.

### Solid

We provide two packages that are specific to Solid:

#### [@felte/solid](./packages/solid)

This is the core package that contains all the basic functionality you need to handle your forms in Solid. Same as `felte` but specifically made for Solid.

#### [@felte/reporter-solid](./packages/reporter-solid)

A reporter package that uses a Solid component to pass the validation messages for you to display. This provides an API that might feel the most familiar to most developers.

### React

We provide two packages that are specific to React:

#### [@felte/react](./packages/react)

This is the main package that contains the basic functionality you need to handle your forms in React. Same as `felte` but specifically made for React.

#### [@felte/reporter-react](./packages/reporter-react)

A reporter packages that uses a React component to pass the validation messages for you to display. This provides an API that might feel the most familiar to most developers.

### Preact

We provide two packages that are specific to Preact:

#### [@felte/preact](./packages/preact)

This is the main package that contains the basic functionality you need to handle your forms in Preact. Same as `felte` but specifically made for Preact. The API is the same as `@felte/react` so you can refer to the same documentation.

#### [@felte/reporter-preact](./packages/reporter-preact)

A reporter packages that uses a Preact component to pass the validation messages for you to display. This provides an API that might feel the most familiar to most developers. The API is the same as `@felte/react` so you can refer to the same documentation.

### Vue

We provide (experimental) support for [Vue](https://vuejs.org) with the following package:

#### [@felte/vue](./packages/vue)

This is package contains the basic functionality you need to handle your forms in Vue. Same as `felte` but specifically made for Vue. The API is similar to that of `felte` but using a custom directive to register your form _and_ returning "accessors" (similar to the react/preact/solid packages) that resolve into reactive `ref`s.

There's no documentation for this right now so use at your own risk.

### VanillaJS

We provide three packages that can be used with only VanillaJS. Two of them using [Web Components](https://www.webcomponents.org/introduction). These elements do not use the shadow DOM since there is no reason to isolate styles.

#### [@felte/element](./packages/element)

This is the main package that contains the basic functionality you need to handle your forms in vanilla JS using a custom element. Similar to `felte` but specifically made to be used as a custom element. This is the recommended way to handle your forms when using Vanilla JS. Web components are [well supported by all major browsers](https://caniuse.com/custom-elementsv1) so this should be a safe option unless you need to support legacy browsers.

#### [@felte/reporter-element](./packages/reporter-element)

A reporter packages that uses a custom element to display validation messages on the DOM. This the recommended way to display your validation messages when using vanilla JS.

#### [@felte/vanilla](./packages/vanilla)

This is the main package that contains the basic functionality you need to handle your forms in vanilla JS. Similar to `felte` and other integrations but with all code related to frameworks removed. This requires a bit more work to use, since you'll be the one in charge of cleaning up subscribers and listeners on it. It's API is basically the same as `felte` (Svelte's integration) so you _can_ use Svelte's documentation as a reference. This can be used as a starting point to create your own integration/package for other environments. When it comes to vanilla JS we'd recommend using `@felte/element` using web components.

### Validators

The following packages can be used with any of the framework specific `felte` wrappers:

#### [@felte/validator-yup](./packages/validator-yup)

A utility package to help you validate your form with [Yup](https://github.com/jquense/yup).

#### [@felte/validator-zod](./packages/validator-zod)

A utility package to help you validate your form with [Zod](https://github.com/colinhacks/zod).

#### [@felte/validator-superstruct](./packages/validator-superstruct)

A utility package to help you validate your form with [Superstruct](https://docs.superstructjs.org).

#### [@felte/validator-vest](./packages/validator-vest)

A utility package to help you validate your form with [Vest](https://vest.vercel.app).

### Reporters

The following packages can be used with any of the framework specific `felte` wrappers:

#### [@felte/reporter-tippy](./packages/reporter-tippy)

A reporter that uses [Tippy.js](https://atomiks.github.io/tippyjs/) to display your validation messages without needing any extra work.

#### [@felte/reporter-cvapi](./packages/reporter-cvapi)

A reporter that uses the browser's [constraint validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) to display your validation messages.

#### [@felte/reporter-dom](./packages/reporter-dom)

A reporter that displays the error messages in the DOM, either as a single element or a list of elements.

## Contributing

If you want to contribute to this project you may check [`CONTRIBUTING.md`](./CONTRIBUTING.md) for general guidelines on how to do so.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pablo-abc"><img src="https://avatars.githubusercontent.com/u/40573613?v=4?s=100" width="100px;" alt="Pablo Berganza"/><br /><sub><b>Pablo Berganza</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=pablo-abc" title="Code">💻</a> <a href="https://github.com/pablo-abc/felte/commits?author=pablo-abc" title="Documentation">📖</a> <a href="#ideas-pablo-abc" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-pablo-abc" title="Maintenance">🚧</a> <a href="https://github.com/pablo-abc/felte/commits?author=pablo-abc" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/loremaps"><img src="https://avatars.githubusercontent.com/u/18003912?v=4?s=100" width="100px;" alt="Panagiotis Kapros"/><br /><sub><b>Panagiotis Kapros</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=loremaps" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://codepoet.de/"><img src="https://avatars.githubusercontent.com/u/462455?v=4?s=100" width="100px;" alt="Benjamin Bender"/><br /><sub><b>Benjamin Bender</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=benbender" title="Code">💻</a> <a href="#ideas-benbender" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/pablo-abc/felte/commits?author=benbender" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/abhijit-kar"><img src="https://avatars.githubusercontent.com/u/25662120?v=4?s=100" width="100px;" alt="Abhijit Kar ツ"/><br /><sub><b>Abhijit Kar ツ</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/issues?q=author%3Aabhijit-kar" title="Bug reports">🐛</a> <a href="#ideas-abhijit-kar" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://convertpack.io/"><img src="https://avatars.githubusercontent.com/u/741969?v=4?s=100" width="100px;" alt="Hugo Maestá"/><br /><sub><b>Hugo Maestá</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=hmaesta" title="Code">💻</a> <a href="#ideas-hmaesta" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/websocket98765"><img src="https://avatars.githubusercontent.com/u/41795874?v=4?s=100" width="100px;" alt="websocket98765"/><br /><sub><b>websocket98765</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/issues?q=author%3Awebsocket98765" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/avimar"><img src="https://avatars.githubusercontent.com/u/314077?v=4?s=100" width="100px;" alt="avimar"/><br /><sub><b>avimar</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=avimar" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://umanggalaiya.in/"><img src="https://avatars.githubusercontent.com/u/5698706?v=4?s=100" width="100px;" alt="Umang Galaiya"/><br /><sub><b>Umang Galaiya</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=umanghome" title="Code">💻</a> <a href="https://github.com/pablo-abc/felte/issues?q=author%3Aumanghome" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/djhi"><img src="https://avatars.githubusercontent.com/u/1122076?v=4?s=100" width="100px;" alt="Gildas Garcia"/><br /><sub><b>Gildas Garcia</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=djhi" title="Code">💻</a> <a href="https://github.com/pablo-abc/felte/issues?q=author%3Adjhi" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/basaran"><img src="https://avatars.githubusercontent.com/u/30809170?v=4?s=100" width="100px;" alt="basaran"/><br /><sub><b>basaran</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=basaran" title="Code">💻</a> <a href="https://github.com/pablo-abc/felte/issues?q=author%3Abasaran" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://ealush.com/"><img src="https://avatars.githubusercontent.com/u/11255103?v=4?s=100" width="100px;" alt="Evyatar"/><br /><sub><b>Evyatar</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=ealush" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/schurhammer"><img src="https://avatars.githubusercontent.com/u/2063443?v=4?s=100" width="100px;" alt="Julian Schurhammer"/><br /><sub><b>Julian Schurhammer</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=schurhammer" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/KoichiKiyokawa"><img src="https://avatars.githubusercontent.com/u/40315079?v=4?s=100" width="100px;" alt="Koichi Kiyokawa"/><br /><sub><b>Koichi Kiyokawa</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=KoichiKiyokawa" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rschristian"><img src="https://avatars.githubusercontent.com/u/33403762?v=4?s=100" width="100px;" alt="Ryan Christian"/><br /><sub><b>Ryan Christian</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=rschristian" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://bandism.net/"><img src="https://avatars.githubusercontent.com/u/22633385?v=4?s=100" width="100px;" alt="Ikko Ashimine"/><br /><sub><b>Ikko Ashimine</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=eltociear" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pasqui23"><img src="https://avatars.githubusercontent.com/u/6931743?v=4?s=100" width="100px;" alt="pasqui23"/><br /><sub><b>pasqui23</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=pasqui23" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://icalvin.de/"><img src="https://avatars.githubusercontent.com/u/40042006?v=4?s=100" width="100px;" alt="Immanuel Calvin Herchenbach"/><br /><sub><b>Immanuel Calvin Herchenbach</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=icalvin102" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dawidmachon"><img src="https://avatars.githubusercontent.com/u/44931854?v=4?s=100" width="100px;" alt="dawidmachon"/><br /><sub><b>dawidmachon</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=dawidmachon" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ecelustka"><img src="https://avatars.githubusercontent.com/u/46893289?v=4?s=100" width="100px;" alt="Emil Celustka"/><br /><sub><b>Emil Celustka</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=ecelustka" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.callum-macdonald.com/"><img src="https://avatars.githubusercontent.com/u/690997?v=4?s=100" width="100px;" alt="Callum Macdonald"/><br /><sub><b>Callum Macdonald</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=chmac" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jasongitmail"><img src="https://avatars.githubusercontent.com/u/50032291?v=4?s=100" width="100px;" alt="Jason"/><br /><sub><b>Jason</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=jasongitmail" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/winston0410"><img src="https://avatars.githubusercontent.com/u/59228178?v=4?s=100" width="100px;" alt="John Winston"/><br /><sub><b>John Winston</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=winston0410" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.timowilhelm.com/"><img src="https://avatars.githubusercontent.com/u/22396907?v=4?s=100" width="100px;" alt="Timo Wilhelm"/><br /><sub><b>Timo Wilhelm</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=TimoWilhelm" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jfreyheit"><img src="https://avatars.githubusercontent.com/u/26486071?v=4?s=100" width="100px;" alt="jfreyheit"/><br /><sub><b>jfreyheit</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=jfreyheit" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/uhon"><img src="https://avatars.githubusercontent.com/u/778583?v=4?s=100" width="100px;" alt="Urs Honegger"/><br /><sub><b>Urs Honegger</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=uhon" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/BradLewis"><img src="https://avatars.githubusercontent.com/u/22850972?v=4?s=100" width="100px;" alt="Bradley Lewis"/><br /><sub><b>Bradley Lewis</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=BradLewis" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/SirbyAlive"><img src="https://avatars.githubusercontent.com/u/1277737?v=4?s=100" width="100px;" alt="Julien Tome"/><br /><sub><b>Julien Tome</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=SirbyAlive" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/xvenge00"><img src="https://avatars.githubusercontent.com/u/22448115?v=4?s=100" width="100px;" alt="xvenge00"/><br /><sub><b>xvenge00</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=xvenge00" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.alfredomm.com/"><img src="https://avatars.githubusercontent.com/u/20406650?v=4?s=100" width="100px;" alt="Alfredo Maria Milano"/><br /><sub><b>Alfredo Maria Milano</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=alfredomariamilano" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Blankeos"><img src="https://avatars.githubusercontent.com/u/38070918?v=4?s=100" width="100px;" alt="Carlo Taleon"/><br /><sub><b>Carlo Taleon</b></sub></a><br /><a href="https://github.com/pablo-abc/felte/commits?author=Blankeos" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

MIT

## Browser support

While further testing would be needed to provide an accurate answer, Felte should work in all evergreen browsers. Polyfills might be needed if you target older browsers such as IE 11 for, at least, `Promise.all`, `Element.closest`, `URLSearchParams`, `fetch`, `CustomEvent` and iterators.
