// widgets/dialog.js
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
    // 是否显示
    visible: {
      type:Boolean,
      value: true,
      observer: function(newVal, oldVal){
        this.triggerEvent('onVisibleChange', newVal)
      }
    },
    // dialog的title显示
    title: {
      type:String,
      value: ""
    },
    // 显示关闭按钮
    showClose: {
      type: Boolean,
      value: false
    },
    // 是否显示遮罩层
    showMask: {
      type: Boolean,
      value: true
    },
    // 遮罩层颜色
    maskColor: {
      type:String,
      value: "#000000"
    },
    maskClosable: {
      type: Boolean,
      value: true
    },
    // 确定按钮的文字
    okText: {
      type:String,
      value: "确定"
    },
    // 取消按钮的文字
    cancelText: {
      type: String,
      value: "取消"
    },
    // dialog宽度
    width: {
      type: String,
      value: "350"
    },
    // 类名
    className: {
      type: String,
      value: ""
    },
    // 传入样式
    styles: {
      type: String,
      value: ""
    },
    // 是否显示头部
    showHeader: {
      type: Boolean,
      value: true
    },
    // 是否显示底部
    showFooter: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  // 生命周期 组件初始化完成
  attached() {
    this.triggerEvent('wxIfonVisibleChange', this.properties.visible)
  },
  // 生命周期 组件销毁
  detached() {
    this.triggerEvent('wxIfonVisibleChange', this.properties.visible)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 隐藏dialog
     * @name hideDialog
     */
    hideDialog () {
      var eventOption = {
        test: false
      }
      this.triggerEvent('hideDialog', eventOption)
    },
    /**
     * 取消按钮事件
     * @name cancelButton
     */
    cancelButton () {
      this.triggerEvent('onCancel')
    },
    /**
     * ok按钮事件
     * @name okButton
     */
    okButton() {
      this.triggerEvent('onOk')
    },
    /**
     * 显示状态返回
     * @name displayStatus
     */
    displayStatus() {
      this.triggerEvent('onVisibleChange', this.properties.visible)
    }
  },
})
