/**
 * 16进制颜色转RGBA格式
 */
export const hexToRgba = (color: string, alpha = 1) => {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/

  let sColor = color.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1)
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))

      sColor = sColorNew
    }
    const sColorChange = []
    for (let i = 1; i < 7; i += 2)
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`))

    return `rgba(${sColorChange.join(',')},${alpha})`
  }
  else {
    return sColor
  }
}
