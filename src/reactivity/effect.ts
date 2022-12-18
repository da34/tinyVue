import { extend } from "../shared";

class ReactiveEffect {
    private readonly _fn: any
    public scheduler?: Function
    active = true
    deps = []
    onStop?: () => void
    constructor(fn, scheduler) {
        this._fn = fn
    }
    run() {
        activeEffect = this
        return this._fn()
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
}
let activeEffect
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

    if (!activeEffect) return
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
    // console.log(targetMap)
}

export function trigger(target, key) {
    const depsMap = targetMap.get(target)
    const dep = depsMap.get(key)
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