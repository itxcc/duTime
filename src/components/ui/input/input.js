import validatorConfig from '../form/validatorConfig'
Component({
  /**
   * 组件的选项
   */
  options:{
    multipleSlots:true
  },
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
      value: '',
      observer: function(newVal, oldVal){
        this.checkActive(newVal)
      }
    },
    rule: {
      type: String,
      value: '',
      observer: function(newVal, oldVal){
        this.setFields(newVal)
        this.checkRequired(newVal)
      }
    },
    type: {
      type: String,
      value: ''
    },
    password: {
      type: Boolean,
      value: false
    },
    size: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: false
    },
    maxlength: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: ''
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
      value: ''
    },
    inputSlot: {
      type: String,
      value: false,
      observer: function(newVal, oldVal){
        this.setInputStyles(newVal)
      }
    },
    inputStyles: {
      type: String,
      value: ''
    },
    emphasize: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // input是否获取焦点
    active: false,
    activeAnime: false,
    onfocus: false,
    // 父组件
    // nodes: [],
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
    checkActive (newVal) {
      let value = newVal || this.data.value
      this.setData({
        active: !!value
      })
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
    validate (sync) {
      const self = this
      let error = false
      this.data.field.validate({
        [this.data.prop]: this.data.value
      }, { firstFields: true }, (errors, fields) => {
        // console.log(errors)
        if (errors) {
          errors.forEach(error => {
            self.data.hasError = true
            self.data.errorMsg = error.message
            !sync && self.setData({
              hasError: true,
              errorMsg: error.message
            })
          })
          error = true
        } else{
          self.data.hasError = false
          self.data.errorMsg = null
          !sync && self.setData({
            hasError: false,
            errorMsg: null
          })
        }
      })
      return error
    },
    postForm (sync) {
      this.validate(sync)
      this.triggerEvent('onChange', {
        prop: this.data.prop,
        value: this.data.value,
        required: this.data.required,
        hasError: this.data.hasError
      })
    },
    handleInput (e) {
      if (!this.data.disabled) {
        this.data.value = e.detail.value
        this.postForm(true)
        if (!this.data.hasError) {
          this.setData({
            value: e.detail.value,
            hasError: false
          })
        } else {
          this.setData({
            value: e.detail.value
          })
        }
      }
    },
    handleFocus () {
      !this.data.disabled && this.setData({
        onfocus: true,
        activeAnime: !this.data.active
      })
    },
    handleBlur () {
      if (!this.data.disabled) {
        this.setData({
          onfocus: false,
          activeAnime: false,
          active: !!this.data.value
        })
        this.postForm()
      }
    },
    handleInputSlot () {
      this.triggerEvent('onInputSlot', {
        prop: this.data.prop,
        value: this.data.value,
        required: this.data.required,
        hasError: this.data.hasError
      })
    },
    setInputStyles (newVal) {
      const inputSlot = newVal || this.data.inputSlot
      let inputStyles = ''
      if (inputSlot) {
        const paddingRight = parseInt(newVal) || 80
        inputStyles = 'padding-right:' + paddingRight*2 + 'rpx'
      }
      this.setData({
        inputStyles: inputStyles
      })
    },
    init () {
      this.setData({
        active: this.data.value != ''
      })
    }
  },
  created: function () {
    // 注册async-validator插件
    this.AsyncValidator = require('../../../utils/async-validator/index')
    // 注册父组件
    // this.data.nodes = this.getRelationNodes('../form/form')
  },
  ready: function () {
    this.init()
    this.setFields()
    this.checkRequired()
  }
})