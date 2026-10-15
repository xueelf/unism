import { build, file, Glob } from 'bun';
import { rm } from 'node:fs/promises';

import { Journal, LevelDebug } from 'annal';

import { compilerOptions } from '#/tsconfig.json';

const logger = new Journal({ scope: 'build', level: LevelDebug });

await rm(compilerOptions.outDir, { recursive: true, force: true });
logger.info('Output directory cleaned');

const entrypoints = await Array.fromAsync(new Glob('src/**/*.css').scan());

await build({
  entrypoints,
  root: 'src',
  outdir: compilerOptions.outDir,
  // 各模块已单独输出，保留 @import 引用，避免在入口中重复打包。
  external: ['*'],
  /*
   * 使用 target: 'bun' 保留 light-dark() 和 :dir()，避免降级转换改变主题与方向判断。
   * Bun 支持单独指定 CSS 构建目标后，再改为 target: 'browser'。
   * https://github.com/oven-sh/bun/issues/40361
   */
  target: 'bun',
});
logger.info('CSS files generated');

const outputPaths = await Array.fromAsync(
  new Glob('**/*').scan({
    absolute: true,
    cwd: compilerOptions.outDir,
  }),
);
const outputBytes = outputPaths.reduce(
  (bytes, path) => bytes + file(path).size,
  0,
);
const outputSize = `${(outputBytes / 1000).toFixed(2)} KB`;

logger.info('Build completed');
logger.debug(`Output: ${compilerOptions.outDir}`);
logger.debug(`Artifacts: ${outputPaths.length} files, ${outputSize}`);
