import validatorConfig from '../form/validatorConfig'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    prop: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: ''
    },
    rule: {
      type: String,
      value: '',
      observer: function(newVal, oldVal){
        this.setFields(newVal)
        this.checkRequired(newVal)
      }
    },
    items: {
      type: Array,
      value: [],
      observer: function(newVal, oldVal){
        this.setValue(newVal)
      }
    },
    customClass: {
      type: String,
      value: ''
    },
    labelText: {
      type: String,
      value: ''
    },
    hasError: {
      type: Boolean,
      value: false
    },
    errorMsg: {
      type: String,
      value: ''
    },
    // 传入样式
    styles: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 表单验证插件async-validator
    AsyncValidator: null,
    // 验证插件对象
    field: {},
    // 是否必填
    required: false
  },
  relations: {
    '../form/form': {
      type: 'parent'
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    checkRequired (newVal) {
      let rule = newVal || this.data.rule
      this.data.required = rule.indexOf('required') != -1
    },
    getRules (rule) {
      let ruleGroup = rule.split('|')
      let rules = []
      ruleGroup.forEach(key => {
        let rule = validatorConfig[key]
        rule && rules.push(rule)
      })
      return rules
    },
    setFields (newVal) {
      let rule = newVal || this.data.rule
      this.data.field = new this.AsyncValidator({
        [this.data.prop]: this.getRules(rule)
      })
    },
    validate () {
      const self = this
      let error = false
      this.data.field.validate({
        [this.data.prop]: this.data.value
      }, { firstFields: true }, (errors, fields) => {
        // console.log(errors)
        if (errors) {
          errors.forEach(error => {
            self.setData({
              hasError: true,
              errorMsg: error.message
            })
          })
          error = true
        } else{
          self.setData({
            hasError: false,
            errorMsg: null
          })
        }
      })
      return error
    },
    setValue (newVal) {
      let items = this.data.items || newVal
      items.forEach(item => {
        if (item.checked) {
          this.data.value = item.value + ''
        }
      })
    },
    postForm (newVal) {
      this.data.value = newVal
      this.validate()
      this.data.items.forEach(item => {
        item.checked = (item.value == newVal)
      })
      this.setData({
        items: this.data.items,
        value: this.data.value
      })
      this.triggerEvent('onChange', {
        prop: this.data.prop,
        value: newVal,
        required: this.data.required,
        hasError: this.data.hasError
      })
    },
    handleTap (e) {
      if (!e.currentTarget.dataset.disabled) {
        this.postForm(e.currentTarget.dataset.value)
      }
    }
  },
  created: function () {
    // 注册async-validator插件
    this.AsyncValidator = require('../../../utils/async-validator/index')
  },
  ready: function () {
    this.setValue()
    this.setFields()
    this.checkRequired()
  }
})