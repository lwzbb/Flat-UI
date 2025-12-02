"""
快速开始 - Skill 系统使用示例
演示如何将 API 封装为 Skill 并快速调用
"""

from skill_system import SkillManager
from skill_system.skills import PaddleOCRSkill


def main():
    """主函数 - 演示 Skill 系统的使用"""
    
    # 1. 创建 Skill 管理器
    manager = SkillManager()
    
    # 2. 注册 Skill（只需要注册一次）
    manager.register(PaddleOCRSkill)
    
    # 3. 查看所有已注册的 Skill
    print("\n=== 已注册的 Skill ===")
    skills = manager.list_skills()
    for name, info in skills.items():
        print(f"  - {name}: {info['description']}")
    
    # 4. 使用 Skill（按需加载，无需手动加载）
    print("\n=== 使用 Skill ===")
    
    # 方式 1: 使用 call 方法（最简单）
    # 注意：这里只是示例，实际使用时需要提供真实的图片路径
    try:
        # result = manager.call('paddleocr', 'path/to/image.jpg')
        # print(f"识别结果: {result}")
        print("示例: result = manager.call('paddleocr', 'path/to/image.jpg')")
    except Exception as e:
        print(f"示例调用（需要真实图片）: {e}")
    
    # 方式 2: 获取 Skill 实例后调用（更灵活）
    ocr_skill = manager.get('paddleocr')
    if ocr_skill:
        print(f"\nSkill 信息: {ocr_skill.get_info()}")
        # 使用简化接口
        # texts = ocr_skill.recognize_text('path/to/image.jpg')
        # print(f"识别文字: {texts}")
    
    # 5. 卸载 Skill（释放资源）
    print("\n=== 卸载 Skill ===")
    manager.unload('paddleocr')
    print("Skill 已卸载，资源已释放")


if __name__ == '__main__':
    main()
