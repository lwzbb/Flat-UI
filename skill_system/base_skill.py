"""
Skill 基类 - 所有 Skill 的抽象基类
"""

from abc import ABC, abstractmethod
from typing import Any, Dict, Optional


class BaseSkill(ABC):
    """Skill 基类，所有 Skill 必须继承此类"""
    
    def __init__(self, name: str, description: str = ""):
        """
        初始化 Skill
        
        Args:
            name: Skill 名称
            description: Skill 描述
        """
        self.name = name
        self.description = description
        self._loaded = False
    
    @abstractmethod
    def load(self) -> None:
        """
        加载 Skill（按需加载）
        在这里初始化 API 客户端、加载模型等
        """
        pass
    
    @abstractmethod
    def execute(self, *args, **kwargs) -> Any:
        """
        执行 Skill 的核心功能
        
        Args:
            *args: 位置参数
            **kwargs: 关键字参数
            
        Returns:
            Skill 执行结果
        """
        pass
    
    @property
    def is_loaded(self) -> bool:
        """检查 Skill 是否已加载"""
        return self._loaded
    
    def ensure_loaded(self) -> None:
        """确保 Skill 已加载，如果未加载则自动加载"""
        if not self._loaded:
            self.load()
            self._loaded = True
    
    def unload(self) -> None:
        """
        卸载 Skill，释放资源
        子类可以重写此方法以实现资源清理
        """
        self._loaded = False
    
    def get_info(self) -> Dict[str, Any]:
        """
        获取 Skill 信息
        
        Returns:
            包含 Skill 信息的字典
        """
        return {
            'name': self.name,
            'description': self.description,
            'loaded': self._loaded
        }
