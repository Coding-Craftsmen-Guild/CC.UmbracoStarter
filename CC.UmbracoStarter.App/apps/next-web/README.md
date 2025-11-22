This folder is intended to contain your Next.js *app* directory from your existing project.

You told me you only want to move the `app` directory (not the .NET `src`).

**How to use:**
1. Copy the contents of `CC.UmbracoStarter.Web/app` from your repo into `apps/next-web/app/`.
2. Keep your existing `package.json` and other config files in the original repo or
   copy/merge them into `apps/next-web/` as needed.
3. Ensure `next.config.js` has `transpilePackages` set for workspace packages.

I've scaffolded helper files here (tailwind, next.config) — merge as needed.
