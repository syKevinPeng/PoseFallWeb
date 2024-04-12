[![pages-build-deployment](https://github.com/syKevinPeng/PoseFallWeb/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/syKevinPeng/PoseFallWeb/actions/workflows/pages/pages-build-deployment)

## How to Run (Development)

Dev mode:

```bash
pnpm dev
```

Build for dist

```bash
pnpm build
```

Deploy on github page

```bash
pnpm deploy-gh
```

## How to Run (Production)

Assuming you have `dist/` folder ready, and your current working directory is inside `dist/`.

```sh
python3 -mhttp.server 8080
```

Change `8080` to any other port number if desired.
