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
      type: Boolean,
      value: false
    },
    rule: {
      type: String,
      value: '',
      observer: function(newVal, oldVal){
        this.setFields(newVal)
        this.checkRequired(newVal)
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
    postForm (newVal) {
      this.data.value = newVal
      this.validate()
      this.setData({
        value: this.data.value
      })
      this.triggerEvent('onChange', {
        prop: this.data.prop,
        value: newVal,
        required: this.data.required,
        hasError: this.data.hasError
      })
    },
    switchChange (e) {
      this.postForm(e.detail.value)
    }
  },
  created: function () {
    // 注册async-validator插件
    this.AsyncValidator = require('../../../utils/async-validator/index')
  },
  ready: function () {
    this.setFields()
    this.checkRequired()
  }
})