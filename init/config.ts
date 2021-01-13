/**
 * 脚手架配置
 * 约定：关于文件和目录的配置都是相对于项目根目录的路径。
 */

// 默认语言
export const defaultLang = 'en_US'
// 语音包目录
export const langDir = 'lang'
// 要删除的目录
export const rmDirs = ['.git', 'init']
// 要删除的文件
export const rmFiles = ['.gitattributes', 'README_EN.md']
// 要修改的文件
export const modifyFiles = [
  'LICENSE',
  'package.json',
  'rollup.config.js',
  'test/library.spec.ts',
  'tools/gh-pages-publish.ts',
  'init/README_template.md'
]
// 要改名的文件
export const renameFiles = [
  ['src/library.ts', 'src/--libraryname--.ts'],
  ['test/library.spec.ts', 'test/--libraryname--.spec.ts'],
  ['init/README_template.md', 'README.md']
]
