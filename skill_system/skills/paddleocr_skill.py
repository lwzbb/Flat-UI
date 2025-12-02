"""
PaddleOCR Skill - 将 PaddleOCR API 封装为可复用的 Skill
"""

import os
from typing import List, Dict, Any, Optional, Union
from pathlib import Path

from ..base_skill import BaseSkill


class PaddleOCRSkill(BaseSkill):
    """
    PaddleOCR Skill - 封装 PaddleOCR API
    
    功能：
    - 图片文字识别（OCR）
    - 支持多种图片格式
    - 按需加载模型，节省内存
    """
    
    def __init__(self):
        super().__init__(
            name="paddleocr",
            description="PaddleOCR 文字识别 Skill，支持图片 OCR 识别"
        )
        self._ocr = None
        self._model_loaded = False
    
    def load(self) -> None:
        """
        按需加载 PaddleOCR 模型
        只有在第一次调用时才会加载，节省内存和启动时间
        """
        try:
            from paddleocr import PaddleOCR
            
            # 初始化 PaddleOCR（按需加载模型）
            # use_angle_cls=True 启用方向分类器
            # lang='ch' 使用中文模型
            self._ocr = PaddleOCR(
                use_angle_cls=True,
                lang='ch',
                show_log=False  # 关闭日志输出
            )
            self._model_loaded = True
            print("✓ PaddleOCR 模型加载完成")
        except ImportError:
            raise ImportError(
                "PaddleOCR 未安装。请运行: pip install paddlepaddle paddleocr"
            )
        except Exception as e:
            raise RuntimeError(f"加载 PaddleOCR 模型失败: {str(e)}")
    
    def execute(
        self,
        image_path: Union[str, Path],
        det: bool = True,
        rec: bool = True,
        cls: bool = False,
        return_details: bool = False
    ) -> Union[List[str], List[Dict[str, Any]]]:
        """
        执行 OCR 识别
        
        Args:
            image_path: 图片路径（支持 jpg, png 等格式）
            det: 是否进行文字检测
            rec: 是否进行文字识别
            cls: 是否进行方向分类
            return_details: 是否返回详细信息（包含坐标、置信度等）
            
        Returns:
            如果 return_details=False: 返回识别出的文字列表
            如果 return_details=True: 返回详细信息列表，每个元素包含：
                - text: 识别的文字
                - confidence: 置信度
                - bbox: 边界框坐标
        """
        # 确保已加载
        self.ensure_loaded()
        
        # 检查文件是否存在
        image_path = Path(image_path)
        if not image_path.exists():
            raise FileNotFoundError(f"图片文件不存在: {image_path}")
        
        # 执行 OCR
        try:
            result = self._ocr.ocr(
                str(image_path),
                det=det,
                rec=rec,
                cls=cls
            )
            
            # 处理结果
            if result is None or len(result) == 0:
                return [] if not return_details else []
            
            # 提取第一张图片的结果（通常只有一张）
            image_result = result[0] if result else []
            
            if return_details:
                # 返回详细信息
                details = []
                for line in image_result:
                    if line:
                        bbox, (text, confidence) = line
                        details.append({
                            'text': text,
                            'confidence': float(confidence),
                            'bbox': bbox
                        })
                return details
            else:
                # 只返回文字列表
                texts = []
                for line in image_result:
                    if line:
                        _, (text, _) = line
                        texts.append(text)
                return texts
                
        except Exception as e:
            raise RuntimeError(f"OCR 识别失败: {str(e)}")
    
    def recognize_text(self, image_path: Union[str, Path]) -> List[str]:
        """
        快速识别图片中的文字（简化接口）
        
        Args:
            image_path: 图片路径
            
        Returns:
            识别出的文字列表
        """
        return self.execute(image_path, return_details=False)
    
    def recognize_with_details(self, image_path: Union[str, Path]) -> List[Dict[str, Any]]:
        """
        识别图片中的文字并返回详细信息
        
        Args:
            image_path: 图片路径
            
        Returns:
            包含文字、置信度、坐标等信息的列表
        """
        return self.execute(image_path, return_details=True)
    
    def unload(self) -> None:
        """卸载 Skill，释放模型资源"""
        if self._ocr is not None:
            # PaddleOCR 没有显式的卸载方法，但可以删除引用
            self._ocr = None
            self._model_loaded = False
        super().unload()
