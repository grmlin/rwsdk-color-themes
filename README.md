# RWSDK Color Themes example

This example shows how it's possible to set a color theme mode (dark | light | system | ...) in a RedwoodSDK application using cookies. 

It uses the Standard RedwoodSDK Starter template.


## How it works

The example supports the following color themes: `dark`, `light`, and `system`. The `system` theme adapts to the user's system preference.
You can set the theme on the root page (`/`) or by editing the cookie manually. 

The example adds a `dark` class name to the `html` element when the theme is set to `dark` or `system` with the systems preference set to dark mode. The `light` theme does not add any class name to the `html` element.

Yes, it was made with tailwindcss in mind. If you need more classes, data attributes or whatever, you can easily adapt the code to your needs.

 ### Workflow

- the `worker.tsx` reads the `theme` cookie and adds a `theme` prop to the global context
- the layout `AppLayout` reads the `theme` variable and passes it to the `AppProviders` component.  
The `AppLayout` has to be a server component, otherwise it can't read the global context
- `AppProviders` has to be a client component, otherwise the `ThemeProviderContext` inside the `ThemeProvider` won't work. 
- the `ThemeProvider` manages the theme settings. It persists the `theme` in a cookie calling a server function (`setThemeFn`), updates the `className` of the `html` element, and maintains a local state to keep track of the current theme without reloading the page.
- the `useTheme()` hook is used to access the `ThemeProviderContext` somewhere in the react three

### FOUC (flash of light/dark content)

To support a `system` theme, which adapts to the user's system preference, we need to ensure that the theme is set before the page is rendered. This prevents a flash of unstyled content (FOUC) when the page loads.
This is only achievable by adding a `<script>` to the `Document` component, which runs before react is hydrated.

If you don't want to use themes, that are calculated dynamically in the client, you can ignore that part.

## Running the dev server
Clone this repository and install the dependencies:

```shell
pnpm install
pnpm dev
```

Point your browser to the URL displayed in the terminal (e.g. `http://localhost:5173/`). You should see a "Hello World" message in your browser.

## Further Reading

- [RedwoodSDK Documentation](https://docs.rwsdk.com/)
- [Cloudflare Workers Secrets](https://developers.cloudflare.com/workers/runtime-apis/secrets/)
