/**
 * 
 * @param component 扩展组件，封装组件的时候达到 <Button></Button> <Button.Group>的效果
 * @param properties 
 * @returns 
 */
export function attachPropertiesToComponent<C, P extends Record<string, any>>(
    component: C,
    properties: P
  ): C & P {
    const ret = component as any
    for (const key in properties) {
      if (properties.hasOwnProperty(key)) {
        ret[key] = properties[key]
      }
    }
    return ret
  }