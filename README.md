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

### Example: 
```js
zAlert.show(`
  <div>Hello to zAlert</div>
  <input type="text" />
`)
```