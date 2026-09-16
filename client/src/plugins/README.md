# Plugins

This directory contains the plugins and services registered in the Vue application.
The central registration file is `index.ts`.

## Plugin Registration

The `registerPlugins(app)` function is called during application startup from
`src/main.ts`. It registers:

- **Vuetify** - UI components, themes, and global styles;
- **Pinia** - centralized state management;
- **Vue I18n** - text localization;
- **Vue Router** - navigation between pages.

```ts
export function registerPlugins(app: App) {
	app.use(vuetify)
	app.use(createPinia())
	app.use(i18n)
	app.use(router)
}
```

## Files

- `index.ts` - registers all application plugins;
- `vuetify.ts` - configures Vuetify, themes, and components;
- `i18n.ts` - configures localization and translations.

## Adding a New Plugin

1. Create the plugin configuration file in this directory.
2. Export the configured plugin instance from the file.
3. Import it in `index.ts`.
4. Add `app.use(...)` to the `registerPlugins` function.

Plugins that require access to the Vue application instance should be registered
according to the library's requirements and the application's initialization order.
