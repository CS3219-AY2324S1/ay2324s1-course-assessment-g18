# Instructions

After you set up, delete the `.git` folder and push the rest of the files to your own repository.

Just run the below after cloning and it should run in your browser.

```shell
npm install
npm run dev
```

## How this was created

You do not have to follow this section, it's just for record.

First, scaffold the project with Vite.

```shell
npm create vite@latest
```

Run it for the first time.

```shell
npm install
npm run dev
```

Install other dependencies

```shell
npm install react-router-dom web-vitals
npm install -D prettier
```

Install Shadcn and its own dependencies like Tailwind, etc. Link to instructions [here](https://ui.shadcn.com/docs/installation/vite).

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
