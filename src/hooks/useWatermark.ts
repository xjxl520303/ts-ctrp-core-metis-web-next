import watermark from 'watermark-package'

export function useWatermark() {
  /**
   * 添加文字水印
   * @param text 水印文本
   */
  function setWatermark(text: string) {
    watermark.setWaterMark(
      {
        w_texts: [text],
        w_options: {
          w_width: 200,
          w_height: 100,
          w_top: '0px',
          w_left: '0px',
          w_rotateDeg: 16,
          w_font: 'lighter 14px PingFang SC',
          w_color: isDark.value ? '#FFFFFF' : '#000000',
          w_opacity: isDark.value ? '0.12' : '0.2',
          w_zIndex: '100000',
        },
      },
    )
  }

  /**
   * 移除水印
   */
  const removeWatermark = watermark.removeWatermark

  return {
    setWatermark,
    removeWatermark,
  }
}
