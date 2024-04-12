[![pages-build-deployment](https://github.com/syKevinPeng/PoseFallWeb/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/syKevinPeng/PoseFallWeb/actions/workflows/pages/pages-build-deployment)

## How to Run (Development)

Dev mode:

```bash
pnpm dev
```

Build for production

```bash
pnpm build && zip -9 -r "dist__$(date +'%Y-%m-%d_%H-%M-%S').zip" dist/
```

<!-- Deploy on github page

```bash
pnpm deploy-gh
``` -->

## How to Run (Production)

Assuming your current working directory is inside `dist/` folder.

```sh
python3 -mhttp.server 8080
```

Change `8080` to any other port number if desired.
