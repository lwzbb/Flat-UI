"""
Skill 系统测试 - 验证核心功能
"""

import sys
from pathlib import Path

def test_imports():
    """测试导入"""
    print("测试 1: 导入模块...")
    try:
        from skill_system import SkillManager, BaseSkill
        from skill_system.skills import PaddleOCRSkill
        print("✓ 导入成功")
        return True
    except Exception as e:
        print(f"✗ 导入失败: {e}")
        return False


def test_registration():
    """测试 Skill 注册"""
    print("\n测试 2: Skill 注册...")
    try:
        from skill_system import SkillManager
        from skill_system.skills import PaddleOCRSkill
        
        manager = SkillManager()
        manager.register(PaddleOCRSkill)
        
        skills = manager.list_skills()
        if 'paddleocr' in skills:
            print("✓ Skill 注册成功")
            return True
        else:
            print("✗ Skill 注册失败")
            return False
    except Exception as e:
        print(f"✗ 注册失败: {e}")
        return False


def test_lazy_loading():
    """测试按需加载"""
    print("\n测试 3: 按需加载机制...")
    try:
        from skill_system import SkillManager
        from skill_system.skills import PaddleOCRSkill
        
        manager = SkillManager()
        manager.register(PaddleOCRSkill)
        
        # 获取 Skill 但不加载
        skill = manager.get('paddleocr', auto_load=False)
        if not skill.is_loaded:
            print("✓ 按需加载机制正常（未自动加载）")
        else:
            print("✗ 按需加载机制异常（不应该自动加载）")
            return False
        
        # 确保加载
        skill.ensure_loaded()
        if skill.is_loaded:
            print("✓ 手动加载成功")
        else:
            print("✗ 手动加载失败")
            return False
        
        return True
    except Exception as e:
        print(f"✗ 测试失败: {e}")
        return False


def test_resource_management():
    """测试资源管理"""
    print("\n测试 4: 资源管理...")
    try:
        from skill_system import SkillManager
        from skill_system.skills import PaddleOCRSkill
        
        manager = SkillManager()
        manager.register(PaddleOCRSkill)
        
        skill = manager.get('paddleocr')
        skill.ensure_loaded()
        
        # 卸载
        manager.unload('paddleocr')
        if not skill.is_loaded:
            print("✓ 资源卸载成功")
            return True
        else:
            print("✗ 资源卸载失败")
            return False
    except Exception as e:
        print(f"✗ 测试失败: {e}")
        return False


def test_skill_info():
    """测试 Skill 信息获取"""
    print("\n测试 5: Skill 信息获取...")
    try:
        from skill_system import SkillManager
        from skill_system.skills import PaddleOCRSkill
        
        manager = SkillManager()
        manager.register(PaddleOCRSkill)
        
        skill = manager.get('paddleocr')
        info = skill.get_info()
        
        if 'name' in info and 'description' in info:
            print(f"✓ Skill 信息: {info['name']} - {info['description']}")
            return True
        else:
            print("✗ Skill 信息不完整")
            return False
    except Exception as e:
        print(f"✗ 测试失败: {e}")
        return False


def main():
    """运行所有测试"""
    print("=" * 50)
    print("Skill 系统功能测试")
    print("=" * 50)
    
    tests = [
        test_imports,
        test_registration,
        test_lazy_loading,
        test_resource_management,
        test_skill_info
    ]
    
    results = []
    for test in tests:
        try:
            result = test()
            results.append(result)
        except Exception as e:
            print(f"✗ 测试异常: {e}")
            results.append(False)
    
    print("\n" + "=" * 50)
    print("测试结果汇总")
    print("=" * 50)
    passed = sum(results)
    total = len(results)
    print(f"通过: {passed}/{total}")
    
    if passed == total:
        print("✓ 所有测试通过！")
        return 0
    else:
        print("✗ 部分测试失败")
        return 1


if __name__ == '__main__':
    sys.exit(main())
