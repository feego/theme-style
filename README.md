#theme-style
**This element is compatible with Polymer 0.5 and lower only.**  
Polymer element to shim data binding to CSS on browsers with no native support.

#### Installation

```
$ bower install feego/theme-style
```

#### Usage

```html
<theme-style>
    .cancel-button {
        background-color: {{cancelButtonColor}}
    }
</theme-style>
```

#### Compile ES2015 source files

```
$ npm install babel-loader
$ webpack ./harmony/src/theme-style.js ./harmony/build/build.js --module-bind "js=babel?stage=0"
```

#### License

The MIT License (MIT)

Copyright (c) 2015 GlazedSolutions