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
      value: false,
      observer: function(newVal, oldVal){
        newVal && this.showToast()
      }
    },
    maskClosable: {
      type: Boolean,
      value: true
    },
    // 传入样式
    maskStyles: {
      type: String,
      value: ""
    },
    dialogStyles: {
      type: String,
      value: ""
    },
    animationType: {
      type: String,
      value: "",
      observer: function(newVal, oldVal){
        this.checkAnimationType(newVal)
      }
    },
    duration: {
      type: Number, value: 2
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeClass: 'ben-dialog-active',
    animationClass: '',
    animationStyle: ''
  },
  // 生命周期 组件初始化完成
  attached() {
  },
  // 生命周期 组件销毁
  detached() {
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
      if (this.data.maskClosable) {
        this.triggerEvent('visibleChange', this.data)
      }
    },
    checkAnimationType (newVal) {
      let type = newVal || this.data.animationType
      switch (type) {
        case 'up':
          this.data.animationClass = 'ben-dialog-up'
          break
          case 'toast':
          this.data.animationClass = 'ben-dialog-toast'
          break
        default:
          this.data.animationClass = ''
          break
      }
      this.setData({
        animationClass: this.data.animationClass
      })
    },
    showToast () {
      if (this.data.animationType == 'toast') {
        clearTimeout(timer)
        var timer = setTimeout(() => {
          this.setData({
            visible: false
          })
          // clearTimeout(timer)
        }, this.data.duration * 1000);
      }
    }
  },
  ready: function () {
    this.checkAnimationType()
  }
})
