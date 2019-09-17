![intro](./media/mixin.png)
# Mixin Classes

## How to mixin classes
```typescript
import {Mixin, getMixin} from './src/index'
class Foo {
  foo: string = 'foo'
  getRoot() {
    return this.root
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


class Root extends Mixin(Foo, Bar) {
  root: string = 'root'
  tell() {
    return this.root
  }
}

const root = new Root()
console.log(root.getRoot()) // -> 'root'
console.log(root.tell()) // -> 'root'

const rootFoo = getMixin(root, 'Foo')
console.log(rootFoo.tell()) // -> 'foo'

const rootBar = getMixin(root, 'Bar')
console.log(rootBar.tell()) // -> 'bar'
```

## More then two

```typescript
import {Mixin} from './src/index'
class Foo {}

class Bar {}

class John {}

class Root extends Mixin(Foo, Bar, John) {}

```

## Mixin Decorator

```typescript
import {MaxLength, validateOrReject} from 'class-validator'
import {Mixin} from './src/index'

class Foo {
  @MaxLength(3)
  foo: string = ''
}

class Bar {}

class Root extends Mixin(Foo, Bar) {}

const root = new Root()
root.foo = 'long-text'

validateOrReject(foo).catch(() => {
  console.log('will catch error')
})
```
