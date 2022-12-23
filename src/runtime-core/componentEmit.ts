import {camelize, toHandleKey} from "../shared";

export function emit(instance, event, ...args) {
  const {props} = instance


  const handleName = toHandleKey(camelize(event))
  console.log(handleName)
  const handle = props[handleName]
  handle && handle(...args)
}