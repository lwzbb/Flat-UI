# Skill 系统快速使用指南

## 🎯 核心价值

这个 Skill 系统实现了「API 转 Skill」的核心价值：

1. **按需加载** - 只在需要时加载模型，节省内存和启动时间
2. **封装复用** - 将 API 封装为可复用的 Skill，无需重复写代码
3. **简单调用** - 一行代码完成功能，无需关心底层实现

## 🚀 3 步快速开始

### 步骤 1: 安装依赖

```bash
pip install -r requirements.txt
```

### 步骤 2: 使用 Skill

```python
from skill_system import SkillManager
from skill_system.skills import PaddleOCRSkill

# 创建管理器并注册
manager = SkillManager()
manager.register(PaddleOCRSkill)

# 一行代码完成 OCR（自动按需加载）
texts = manager.call('paddleocr', 'image.jpg')
print(texts)  # ['识别出的文字1', '识别出的文字2']
```

### 步骤 3: 完成！

就这么简单！模型会在第一次调用时自动加载，后续调用直接复用。

## 📝 更多用法

### 获取详细信息

```python
# 包含坐标、置信度等信息
details = manager.call('paddleocr', 'image.jpg', return_details=True)
for item in details:
    print(f"文字: {item['text']}")
    print(f"置信度: {item['confidence']:.2f}")
```

### 使用命令行

```bash
# 基础识别
python skill_cli.py ocr image.jpg

# 详细信息
python skill_cli.py ocr image.jpg --details
```

### 资源管理

```python
# 使用完毕后卸载，释放内存
manager.unload('paddleocr')
```

## 💡 核心优势

### 传统方式 vs Skill 方式

**传统方式（需要重复写代码）：**
```python
# 每次都要写这些代码
from paddleocr import PaddleOCR
ocr = PaddleOCR(use_angle_cls=True, lang='ch')
result = ocr.ocr('image.jpg')
texts = [line[1][0] for line in result[0]]
```

**Skill 方式（一行代码）：**
```python
texts = manager.call('paddleocr', 'image.jpg')
```

### 按需加载的优势

- ✅ 启动时无需加载所有模型（节省启动时间）
- ✅ 只在需要时加载（节省内存）
- ✅ 可以卸载释放资源（灵活管理）

### 封装复用的优势

- ✅ 无需重复写初始化代码
- ✅ 统一的调用接口
- ✅ 易于维护和扩展

## 🔧 扩展新 Skill

只需要 3 步：

```python
# 1. 继承 BaseSkill
from skill_system.base_skill import BaseSkill

class MySkill(BaseSkill):
    def load(self):
        # 2. 实现加载逻辑
        pass
    
    def execute(self, *args, **kwargs):
        # 3. 实现执行逻辑
        pass

# 注册使用
manager.register(MySkill)
result = manager.call('myskill', arg1, arg2)
```

## 📚 完整文档

查看 `SKILL_SYSTEM_README.md` 获取完整文档。
