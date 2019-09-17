/* eslint-disable no-proto */

/* tslint:disable:ban-types variable-name */

export function Mixin<A>(classA: AnyClass<A>): AnyClass<A>
export function Mixin<A, B>(classA: AnyClass<A>, classB: AnyClass<B>): AnyClass<A & B>
export function Mixin<A, B, C>(
  classA: AnyClass<A>, classB: AnyClass<B>, classC: AnyClass<C>,
): AnyClass<A & B & C>
export function Mixin<A, B, C, D>(
  classA: AnyClass<A>, classB: AnyClass<B>, classC: AnyClass<C>, classD: AnyClass<D>,
): AnyClass<A & B & C & D>
export function Mixin<A, B, C, D, E>(
  classA: AnyClass<A>, classB: AnyClass<B>, classC: AnyClass<C>, classD: AnyClass<D>,
  classE: AnyClass<E>,
): AnyClass<A & B & C & D & E>
export function Mixin<A, B, C, D, E, F>(
  classA: AnyClass<A>, classB: AnyClass<B>, classC: AnyClass<C>, classD: AnyClass<D>,
  classE: AnyClass<E>, classF: AnyClass<F>,
): AnyClass<A & B & C & D & E & F>
export function Mixin<A, B, C, D, E, F, G>(
  classA: AnyClass<A>, classB: AnyClass<B>, classC: AnyClass<C>, classD: AnyClass<D>,
  classE: AnyClass<E>, classF: AnyClass<F>, classG: AnyClass<G>,
): AnyClass<A & B & C & D & E & F & G>
export function Mixin<A, B, C, D, E, F, G, H>(
  classA: AnyClass<A>, classB: AnyClass<B>, classC: AnyClass<C>, classD: AnyClass<D>,
  classE: AnyClass<E>, classF: AnyClass<F>, classG: AnyClass<G>, classH: AnyClass<H>,
): AnyClass<A & B & C & D & E & F & G & H>
export function Mixin<A, B, C, D, E, F, G, H, I>(
  classA: AnyClass<A>, classB: AnyClass<B>, classC: AnyClass<C>, classD: AnyClass<D>,
  classE: AnyClass<E>, classF: AnyClass<F>, classG: AnyClass<G>, classH: AnyClass<H>,
  classI: AnyClass<I>,
): AnyClass<A & B & C & D & E & F & G & H & I>
export function Mixin<T>(...classes: AnyClass[]): T
export function Mixin(...classes: any): any {
  const [first, ..._classes] = classes
  let target: any = first

  _classes.forEach((classOne: any) => {
    target = _mix(target, classOne)
  })
  return target
}

export type AnyClass<A = any> = new (...args: any) => A
export const mixinSymbol = Symbol('mixin')

export const getMixin = (myClass: any, name: string): any => {
  return new Proxy({}, {
    get(target, prop) {
      const mixin = myClass[mixinSymbol]
      if(mixin === null || mixin === undefined) {
        return undefined
      }
      const mixinTarget = mixin[name]
      if(mixinTarget === null || mixinTarget === undefined) {
        return undefined
      }
      const propTarget = mixinTarget[prop]
      if(typeof propTarget === 'function') {
        return propTarget.bind(myClass)
      }
      return propTarget
    },
  })
}

/**
 * Mix two classes
 * @param Source
 * @param Base
 */
const _mix = (
  Source: any,
  Base: any,
): any => {


  class Mixed {
    constructor(...args: any[]) {
      const source = new Source.prototype.constructor(...args)
      const base = new Base.prototype.constructor(...args)
      Object.assign(this, source)
      Object.assign(this, base)
      Object.setPrototypeOf(Object.getPrototypeOf(this), {
        [mixinSymbol]: {
          [Source.name]: Object.getPrototypeOf(source),
          [Base.name]: Object.getPrototypeOf(base),
        },
        __proto__: {
          ...Object.getPrototypeOf(base),
          __proto__: Object.getPrototypeOf(source),
        },
      })
    }
  }

  return Mixed
}

