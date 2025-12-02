"""
Skill 管理器 - 管理所有 Skill 的注册、加载和调用
"""

from typing import Any, Dict, Optional, Type
from .base_skill import BaseSkill


class SkillManager:
    """Skill 管理器，负责 Skill 的注册、按需加载和调用"""
    
    def __init__(self):
        """初始化 Skill 管理器"""
        self._skills: Dict[str, Type[BaseSkill]] = {}
        self._instances: Dict[str, BaseSkill] = {}
    
    def register(self, skill_class: Type[BaseSkill]) -> None:
        """
        注册一个 Skill 类
        
        Args:
            skill_class: Skill 类（继承自 BaseSkill）
        """
        skill_name = skill_class.__name__.replace('Skill', '').lower()
        self._skills[skill_name] = skill_class
        print(f"✓ 已注册 Skill: {skill_name}")
    
    def get(self, skill_name: str, auto_load: bool = True) -> Optional[BaseSkill]:
        """
        获取 Skill 实例（按需加载）
        
        Args:
            skill_name: Skill 名称
            auto_load: 是否自动加载（如果未加载）
            
        Returns:
            Skill 实例，如果不存在则返回 None
        """
        if skill_name not in self._skills:
            print(f"✗ Skill '{skill_name}' 未注册")
            return None
        
        # 如果实例不存在，创建新实例
        if skill_name not in self._instances:
            skill_class = self._skills[skill_name]
            # 从类名推断名称
            name = skill_class.__name__.replace('Skill', '')
            self._instances[skill_name] = skill_class()
        
        instance = self._instances[skill_name]
        
        # 按需加载
        if auto_load and not instance.is_loaded:
            print(f"📦 正在加载 Skill: {skill_name}...")
            instance.ensure_loaded()
            print(f"✓ Skill '{skill_name}' 加载完成")
        
        return instance
    
    def call(self, skill_name: str, *args, **kwargs) -> Any:
        """
        调用 Skill（自动按需加载）
        
        Args:
            skill_name: Skill 名称
            *args: 传递给 Skill 的位置参数
            **kwargs: 传递给 Skill 的关键字参数
            
        Returns:
            Skill 执行结果
        """
        skill = self.get(skill_name, auto_load=True)
        if skill is None:
            raise ValueError(f"Skill '{skill_name}' 不存在")
        
        return skill.execute(*args, **kwargs)
    
    def list_skills(self) -> Dict[str, Dict[str, Any]]:
        """
        列出所有已注册的 Skill
        
        Returns:
            包含所有 Skill 信息的字典
        """
        result = {}
        for name, skill_class in self._skills.items():
            info = {
                'class': skill_class.__name__,
                'description': getattr(skill_class, '__doc__', '') or '',
                'loaded': name in self._instances and self._instances[name].is_loaded
            }
            result[name] = info
        return result
    
    def unload(self, skill_name: str) -> None:
        """
        卸载指定的 Skill，释放资源
        
        Args:
            skill_name: Skill 名称
        """
        if skill_name in self._instances:
            self._instances[skill_name].unload()
            print(f"✓ Skill '{skill_name}' 已卸载")
    
    def unload_all(self) -> None:
        """卸载所有已加载的 Skill"""
        for skill_name in list(self._instances.keys()):
            self.unload(skill_name)
