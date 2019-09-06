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
    }
    const result = new Mixed()
    expect(result.foo).to.equal('foo')
    expect(result.bar).to.equal('bar')
    expect(result.john).to.equal('john')
    expect(result.getFoo()).to.equal('foo')
    expect(result.tell()).to.equal('john')
    const mixinFoo = getMixin(result, 'Bar')
    expect(mixinFoo.tell()).to.equal('bar')
  })
  it('should mixin 3 classes', function test() {
    class Foo {
      get foo() {
        return 'foo'
      }
      getFoo() {
        return this.foo
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
    }
    const result = new Mixed()
    expect(result.foo).to.equal('foo')
    expect(result.bar).to.equal('bar')
    expect(result.john).to.equal('john')
    expect(result.hack).to.equal('hack')
    expect(result.getFoo()).to.equal('foo')
  })
})
