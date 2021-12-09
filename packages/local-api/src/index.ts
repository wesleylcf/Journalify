import cellsRouter from './routes/cells';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';

export const serve = (
  port: number,
  fileName: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  const packagePath = require.resolve(
    '@journalify/local-client/build/index.html'
  );
  app.use(cellsRouter(fileName, dir));
  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
