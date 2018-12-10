# h1
## h2
### h3
#### h4
##### h5
###### h6
----
## table

| 参数      | 说明                                     | 类型       |
|-----------|------------------------------------------|------------|
| getFieldsValue | 获取一组输入控件的值，如不传入参数，则获取全部组件的值 | Function([fieldNames: string[]]) |
| getFieldValue | 获取一个输入控件的值 | Function(fieldName: string) |
| setFieldsValue | 设置一组输入控件的值 | Function(obj: object) |
| setFields | 设置一组输入控件的值与 Error | Function(obj: object) |
| validateFields | 校验并获取一组输入域的值与 Error | Function([fieldNames: string[]], [options: object], callback: Function(errors, values)) |
| validateFieldsAndScroll | 与 `validateFields` 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围 | 参考 `validateFields` |
| getFieldError | 获取某个输入控件的 Error | Function(name) |
| isFieldValidating | 判断一个输入控件是否在校验状态 | Function(name) |
| resetFields | 重置一组输入控件的值与状态，如不传入参数，则重置所有组件 | Function([names: string[]]) |
| getFieldProps | 用于和表单进行双向绑定，详见下方描述 | |
