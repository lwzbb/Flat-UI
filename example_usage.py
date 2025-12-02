"""
完整使用示例 - 演示 PaddleOCR Skill 的各种用法
"""

from skill_system import SkillManager
from skill_system.skills import PaddleOCRSkill


def example_basic_usage():
    """示例 1: 基础使用 - 最简单的调用方式"""
    print("=" * 50)
    print("示例 1: 基础使用")
    print("=" * 50)
    
    manager = SkillManager()
    manager.register(PaddleOCRSkill)
    
    # 一行代码完成 OCR（自动按需加载）
    # texts = manager.call('paddleocr', 'image.jpg')
    # print(f"识别结果: {texts}")
    print("代码: texts = manager.call('paddleocr', 'image.jpg')")
    print("说明: 自动按需加载，无需手动初始化")


def example_detailed_usage():
    """示例 2: 详细使用 - 获取更多信息"""
    print("\n" + "=" * 50)
    print("示例 2: 获取详细信息")
    print("=" * 50)
    
    manager = SkillManager()
    manager.register(PaddleOCRSkill)
    
    ocr_skill = manager.get('paddleocr')
    
    # 获取详细信息（包含坐标、置信度）
    # details = ocr_skill.recognize_with_details('image.jpg')
    # for item in details:
    #     print(f"文字: {item['text']}")
    #     print(f"置信度: {item['confidence']:.2f}")
    #     print(f"坐标: {item['bbox']}")
    
    print("代码:")
    print("  details = ocr_skill.recognize_with_details('image.jpg')")
    print("说明: 返回文字、置信度、坐标等完整信息")


def example_lazy_loading():
    """示例 3: 按需加载 - 演示延迟加载机制"""
    print("\n" + "=" * 50)
    print("示例 3: 按需加载机制")
    print("=" * 50)
    
    manager = SkillManager()
    manager.register(PaddleOCRSkill)
    
    # 获取 Skill 实例（此时还未加载）
    ocr_skill = manager.get('paddleocr', auto_load=False)
    print(f"Skill 已加载? {ocr_skill.is_loaded}")
    
    # 第一次调用时自动加载
    # texts = ocr_skill.recognize_text('image.jpg')
    print("第一次调用时自动加载模型")
    print(f"Skill 已加载? {ocr_skill.is_loaded}")


def example_resource_management():
    """示例 4: 资源管理 - 卸载 Skill 释放内存"""
    print("\n" + "=" * 50)
    print("示例 4: 资源管理")
    print("=" * 50)
    
    manager = SkillManager()
    manager.register(PaddleOCRSkill)
    
    # 使用 Skill
    ocr_skill = manager.get('paddleocr')
    print(f"Skill 已加载: {ocr_skill.is_loaded}")
    
    # 使用完毕后卸载，释放内存
    manager.unload('paddleocr')
    print(f"Skill 已加载: {ocr_skill.is_loaded}")
    print("说明: 卸载后可以释放模型占用的内存")


def example_multiple_calls():
    """示例 5: 多次调用 - 复用已加载的模型"""
    print("\n" + "=" * 50)
    print("示例 5: 多次调用复用")
    print("=" * 50)
    
    manager = SkillManager()
    manager.register(PaddleOCRSkill)
    
    # 第一次调用会加载模型
    # result1 = manager.call('paddleocr', 'image1.jpg')
    
    # 后续调用直接使用已加载的模型，无需重新加载
    # result2 = manager.call('paddleocr', 'image2.jpg')
    # result3 = manager.call('paddleocr', 'image3.jpg')
    
    print("代码:")
    print("  result1 = manager.call('paddleocr', 'image1.jpg')  # 首次加载")
    print("  result2 = manager.call('paddleocr', 'image2.jpg')  # 复用模型")
    print("  result3 = manager.call('paddleocr', 'image3.jpg')  # 复用模型")
    print("说明: 模型只加载一次，后续调用直接复用")


def main():
    """运行所有示例"""
    example_basic_usage()
    example_detailed_usage()
    example_lazy_loading()
    example_resource_management()
    example_multiple_calls()
    
    print("\n" + "=" * 50)
    print("核心价值总结")
    print("=" * 50)
    print("1. 按需加载: 只在需要时加载模型，节省启动时间和内存")
    print("2. 封装复用: API 封装为 Skill，无需重复写代码")
    print("3. 简单调用: 一行代码完成 OCR，无需关心底层实现")
    print("4. 资源管理: 可以卸载 Skill 释放资源")


if __name__ == '__main__':
    main()
