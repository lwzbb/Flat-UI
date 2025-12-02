# Skill 系统 - API 转 Skill 核心框架

## 📖 简介

Skill 系统实现了「API 转 Skill」的核心价值：
- **按需加载**：只在需要时加载模型/资源，节省内存和启动时间
- **封装复用**：将 API 封装为可复用的 Skill，无需重复写代码
- **简单调用**：一行代码完成复杂功能，无需关心底层实现

## 🎯 核心特性

### 1. 按需加载（Lazy Loading）
- Skill 只在第一次调用时加载
- 后续调用直接复用已加载的资源
- 可以手动卸载释放内存

### 2. 封装复用（Encapsulation）
- 将复杂的 API 调用封装为简单的 Skill
- 统一的接口，易于使用和维护
- 支持扩展新的 Skill

### 3. 简单调用（Easy Usage）
- 一行代码完成功能调用
- 自动处理加载、错误处理等细节
- 支持命令行和代码两种使用方式

## 🚀 快速开始

### 安装依赖

```bash
pip install -r requirements.txt
```

### 基础使用

```python
from skill_system import SkillManager
from skill_system.skills import PaddleOCRSkill

# 1. 创建管理器并注册 Skill
manager = SkillManager()
manager.register(PaddleOCRSkill)

# 2. 一行代码完成 OCR（自动按需加载）
texts = manager.call('paddleocr', 'image.jpg')
print(texts)  # ['识别出的文字1', '识别出的文字2', ...]
```

### 获取详细信息

```python
# 获取包含坐标、置信度的详细信息
details = manager.call('paddleocr', 'image.jpg', return_details=True)
for item in details:
    print(f"文字: {item['text']}")
    print(f"置信度: {item['confidence']}")
    print(f"坐标: {item['bbox']}")
```

### 使用 Skill 实例（更灵活）

```python
ocr_skill = manager.get('paddleocr')

# 简化接口
texts = ocr_skill.recognize_text('image.jpg')

# 详细信息接口
details = ocr_skill.recognize_with_details('image.jpg')
```

## 📝 命令行使用

### OCR 识别

```bash
# 基础识别
python skill_cli.py ocr image.jpg

# 显示详细信息
python skill_cli.py ocr image.jpg --details
```

### 列出所有 Skill

```bash
python skill_cli.py list
```

## 🏗️ 架构设计

### 核心组件

1. **BaseSkill** - Skill 基类
   - 定义 Skill 的标准接口
   - 实现按需加载机制
   - 提供资源管理功能

2. **SkillManager** - Skill 管理器
   - 注册和管理所有 Skill
   - 提供统一的调用接口
   - 实现按需加载和资源管理

3. **PaddleOCRSkill** - PaddleOCR 封装
   - 封装 PaddleOCR API
   - 提供简化的调用接口
   - 支持多种输出格式

### 目录结构

```
skill_system/
├── __init__.py          # 模块初始化
├── base_skill.py        # Skill 基类
├── skill_manager.py     # Skill 管理器
└── skills/              # 预定义 Skill
    ├── __init__.py
    └── paddleocr_skill.py  # PaddleOCR Skill
```

## 🔧 扩展新 Skill

### 创建自定义 Skill

```python
from skill_system.base_skill import BaseSkill

class MyCustomSkill(BaseSkill):
    """自定义 Skill"""
    
    def __init__(self):
        super().__init__(
            name="mycustom",
            description="我的自定义 Skill"
        )
        self._client = None
    
    def load(self):
        """按需加载资源"""
        # 在这里初始化 API 客户端、加载模型等
        self._client = SomeAPIClient()
    
    def execute(self, *args, **kwargs):
        """执行 Skill 功能"""
        # 实现具体功能
        return self._client.do_something(*args, **kwargs)
```

### 注册和使用

```python
manager = SkillManager()
manager.register(MyCustomSkill)

# 使用
result = manager.call('mycustom', arg1, arg2)
```

## 💡 使用场景

### 场景 1: 批量处理图片

```python
manager = SkillManager()
manager.register(PaddleOCRSkill)

# 模型只加载一次，处理多张图片
images = ['img1.jpg', 'img2.jpg', 'img3.jpg']
for img in images:
    texts = manager.call('paddleocr', img)
    print(f"{img}: {texts}")
```

### 场景 2: 按需使用，节省资源

```python
# 只有在真正需要时才加载模型
if need_ocr:
    texts = manager.call('paddleocr', 'image.jpg')
```

### 场景 3: 资源管理

```python
# 使用完毕后卸载，释放内存
manager.call('paddleocr', 'image.jpg')
manager.unload('paddleocr')  # 释放资源
```

## 🎨 核心价值体现

### 1. 按需加载
- ✅ 启动时无需加载所有模型
- ✅ 只在需要时加载，节省内存
- ✅ 可以卸载释放资源

### 2. 封装复用
- ✅ API 调用封装为简单接口
- ✅ 无需重复写初始化代码
- ✅ 统一的调用方式

### 3. 简单调用
- ✅ 一行代码完成功能
- ✅ 自动处理加载和错误
- ✅ 支持多种调用方式

## 📚 示例代码

查看以下文件了解更多示例：

- `example_usage.py` - 完整使用示例
- `skill_system/quick_start.py` - 快速开始指南
- `skill_cli.py` - 命令行工具示例

## 🤝 贡献

欢迎扩展新的 Skill！只需：
1. 继承 `BaseSkill` 类
2. 实现 `load()` 和 `execute()` 方法
3. 注册到 `SkillManager`

## 📄 许可证

MIT License
