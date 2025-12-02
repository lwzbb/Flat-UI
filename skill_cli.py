#!/usr/bin/env python3
"""
Skill 命令行工具 - 快速调用 Skill 的 CLI 接口
"""

import sys
import argparse
from pathlib import Path
from skill_system import SkillManager
from skill_system.skills import PaddleOCRSkill


def setup_manager():
    """设置 Skill 管理器"""
    manager = SkillManager()
    manager.register(PaddleOCRSkill)
    return manager


def ocr_command(args):
    """OCR 命令处理"""
    manager = setup_manager()
    
    image_path = Path(args.image)
    if not image_path.exists():
        print(f"错误: 图片文件不存在: {image_path}")
        return 1
    
    try:
        if args.details:
            # 返回详细信息
            result = manager.call('paddleocr', str(image_path), return_details=True)
            print("\n识别结果（详细信息）:")
            print("-" * 50)
            for i, item in enumerate(result, 1):
                print(f"\n[{i}] 文字: {item['text']}")
                print(f"    置信度: {item['confidence']:.4f}")
                print(f"    坐标: {item['bbox']}")
        else:
            # 只返回文字
            result = manager.call('paddleocr', str(image_path))
            print("\n识别结果:")
            print("-" * 50)
            for i, text in enumerate(result, 1):
                print(f"{i}. {text}")
        
        return 0
    except Exception as e:
        print(f"错误: {e}")
        return 1


def list_command(args):
    """列出所有 Skill"""
    manager = setup_manager()
    skills = manager.list_skills()
    
    print("\n已注册的 Skill:")
    print("-" * 50)
    for name, info in skills.items():
        status = "✓ 已加载" if info['loaded'] else "○ 未加载"
        print(f"  {name:20s} {status}")
        if info['description']:
            print(f"    {info['description']}")
    
    return 0


def main():
    """主函数"""
    parser = argparse.ArgumentParser(
        description='Skill 系统命令行工具',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  # 识别图片中的文字
  python skill_cli.py ocr image.jpg
  
  # 识别并显示详细信息
  python skill_cli.py ocr image.jpg --details
  
  # 列出所有 Skill
  python skill_cli.py list
        """
    )
    
    subparsers = parser.add_subparsers(dest='command', help='可用命令')
    
    # OCR 命令
    ocr_parser = subparsers.add_parser('ocr', help='OCR 文字识别')
    ocr_parser.add_argument('image', help='图片路径')
    ocr_parser.add_argument('--details', action='store_true', help='显示详细信息（坐标、置信度）')
    
    # List 命令
    list_parser = subparsers.add_parser('list', help='列出所有 Skill')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return 1
    
    if args.command == 'ocr':
        return ocr_command(args)
    elif args.command == 'list':
        return list_command(args)
    else:
        parser.print_help()
        return 1


if __name__ == '__main__':
    sys.exit(main())
