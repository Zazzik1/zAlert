# zAlert
Simple Alert in JS

## Usage:
```html
<script src="zAlert.js"></script>
```
```js
zAlert.show(htmlString, options)
```

### Supported options:
Option|Type|Default|Description|
-|-|-|-
closeButton|boolean|`true`|Used to hide the close button
duration|number|`300`|Duration of the show/hide animations [ms]
bgColor|string|`white`|Background color
color|string|`rgb(40, 40, 40)`|Text color
borderColor|string|`rgb(220, 220, 220)`|Border color

### Example:
```js
await zAlert.show(`
  <div>Hello to zAlert</div>
  <input type="text" />
`)
```