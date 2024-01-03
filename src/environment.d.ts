/**
 * _模块扩充_
 * 包含模块扩充的文件必须是 _模块_（而不是 _脚本_）。模块和脚本的区别在于模块至少有一个导入/导出语句。
 * 为了使 TypeScript 将您的文件视为一个模块，只需向其中添加一个 import 语句即可。它可以是任何东西。甚至 export {} 也行。
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      __DEV__: string;
      __FIREFOX__: string;
    }
  }
}

export {};
