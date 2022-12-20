import { extend } from "../shared";
let activeEffect
let shouldTrack
export class ReactiveEffect {
    private readonly _fn: any
    public scheduler?: Function
    active = true
    deps = []
    onStop?: () => void
    constructor(fn, scheduler?) {
        this._fn = fn
        this.scheduler = scheduler
    }
    run() {
        if (!this.active) {
           return  this._fn()
        }
        activeEffect = this
        shouldTrack = true
        const result =  this._fn()
        shouldTrack = false
        return result
    }
    stop() {
        if (this.active) {
            this.onStop && this.onStop()
            cleanupEffect(this)
            this.active = false
        }
    }
}

function cleanupEffect(effect){
    effect.deps.forEach((dep: any) => {
        dep.delete(effect)
    })
    effect.deps.length = 0
}

export function effect(fn, options: any = {}) {
    const _effect = new ReactiveEffect(fn, options.scheduler)
    _effect.run()
    extend(_effect, options)
    const runner: any = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
}

const targetMap = new Map()
export function track(target, key) {
    if (!isTacking()) return;
    // target -> key -> effect
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Set()
        depsMap.set(key, dep)
    }
    trackEffects(dep)
    // console.log(targetMap)
}
export function isTacking() {
    return shouldTrack && activeEffect != null
}

export function trackEffects(dep) {
    if (dep.has(activeEffect)) return;
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
}
export function trigger(target, key) {
    const depsMap = targetMap.get(target)
    const dep = depsMap.get(key)
    triggerEffects(dep)
}
export function triggerEffects(dep) {
    for(const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler()
        } else {
            effect.run()
        }
    }
}
export function stop(runner) {
    runner.effect.stop()
}