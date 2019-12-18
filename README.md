# use-sync-scroll-hook

> React hook to synchronise the scroll position of multiple containers.

[![NPM](https://img.shields.io/npm/v/use-sync-scroll-hook.svg)](https://www.npmjs.com/package/use-sync-scroll-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo

https://slocka.github.io/use-sync-scroll-hook/

## Install

```bash
npm install --save use-sync-scroll-hook
```
or
```bash
yarn add use-sync-scroll-hook
```

## Usage

```jsx
import React, { useRef } from 'react'

import useSyncScroll from 'use-sync-scroll-hook'

export default function Example() {
  const headerRef = useRef()
  const bodyRef = useRef()

  useSyncScroll([headerRef, bodyRef])

  return (
    <div className="table">
      <div ref={headerRef} className="table-header">
          ...
      </div>
      <div ref={bodyRef} className="table-body">
        ...
      </div>
    </div>
  )
}
```

## License

MIT © [slocka](https://github.com/slocka)
