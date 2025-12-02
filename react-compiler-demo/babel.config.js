// Babel 配置（如果使用 Babel）
module.exports = {
  plugins: [
    [
      'babel-plugin-react-compiler',
      {
        // 编译模式：'annotation' 需要手动标记，'infer' 自动推断
        compilationMode: 'annotation',
        // 运行时模块
        runtimeModule: 'react-compiler-runtime',
      },
    ],
  ],
}
