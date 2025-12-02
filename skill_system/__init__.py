"""
Skill 系统 - API 转 Skill 核心框架
实现按需加载、封装复用的核心价值
"""

from .skill_manager import SkillManager
from .base_skill import BaseSkill

__all__ = ['SkillManager', 'BaseSkill']
