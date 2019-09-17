import {Mixin, getMixin} from '@/index'
import {MaxLength, validateOrReject} from 'class-validator'


describe('MixIn', function test() {
  it('should mixin', function test() {
    class Foo {
      get foo() {
        return 'foo'
      }
      getFoo() {
        return this.foo
      }
      getJohn() {
        // @ts-ignore
        return this.john
      }
      tell() {
        return this.foo
      }
    }
    class Bar {
      bar: string = 'bar'
      tell() {
        return this.bar
      }
    }
    class Mixed extends Mixin(Foo, Bar) {
      john: string = 'john'
      tell() {
        return this.john
      }

      mixinRoot() {
        return this.john
      }
    }
    const result = new Mixed()
    expect(result.foo).to.equal('foo')
    expect(result.bar).to.equal('bar')
    expect(result.john).to.equal('john')
    expect(result.getFoo()).to.equal('foo')
    expect(result.getJohn()).to.equal('john')
    const mixinFoo = getMixin(result, 'Foo')
    expect(mixinFoo.tell()).to.equal('foo')
    const mixinBar = getMixin(result, 'Bar')
    expect(mixinBar.tell()).to.equal('bar')
    expect(result.mixinRoot()).to.equal('john')
    expect(result.tell()).to.equal('john')
  })
  it('should run decorator', async function test() {
    class Foo {
      @MaxLength(3)
      foo: string = ''
    }

    class Bar {

    }

    class Mixed extends Mixin(Foo, Bar) {
    }

    const foo = new Mixed()
    foo.foo = 'long-text'
    let ok = false
    try {
      await validateOrReject(foo)
    } catch(e) {
      ok = true
    }
    expect(ok).to.equal(true)


  })
  it('should mixin 3 classes', function test() {
    class Foo {
      get foo() {
        return 'foo'
      }
      getFoo() {
        return this.foo
      }

      getHack() {
        // @ts-ignore
        return this.hack
      }
    }
    class Bar {
      bar: string = 'bar'
    }
    class Hack {
      hack: string = 'hack'
    }
    class Mixed extends Mixin(Foo, Bar, Hack) {
      john: string = 'john'
      getJohn() {
        return this.john
      }
    }
    const result = new Mixed()

    expect(result.foo).to.equal('foo')
    expect(result.bar).to.equal('bar')
    expect(result.john).to.equal('john')
    expect(result.hack).to.equal('hack')
    expect(result.getFoo()).to.equal('foo')
    expect(result.getJohn()).to.equal('john')
    expect(result.getHack()).to.equal('hack')
  })
})
