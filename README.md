# zAlert
Simple Alert in JS

## Usage:
```html
<script src="zAlert.js"></script>
```
```js
zAlert.show(htmlStringOrElement, options)
```

### Supported options:
Option|Type|Default|Description|
-|-|-|-
closeButton|boolean|`true`|Used to hide the close button
duration|number|`300`|Duration of the show/hide animations [ms]
hideOnBlur|boolean|`true`|States if alert should be closed when clicked outside of it
bgColor|string|`white`|Background color
color|string|`rgb(40, 40, 40)`|Text color
borderColor|string|`rgb(220, 220, 220)`|Border color

### Examples:
```js
await zAlert.show(`
  <div>Hello to zAlert</div>
  <input type="text" />
`)
```

```js
await zAlert.show(`Custom styles`, {
  bgColor: '#3e6370',
  color: '#e0e0e0',
})
```

```js
let input = document.createElement('input')
input.type = 'date'
await zAlert.show(input)
```
