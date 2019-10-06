Component({
  /**
   * 组件的属性列表
   */
  properties: {
    prop: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
      value: false
    },
    customClass: {
      type: String,
      value: ''
    },
    btnClass: {
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
    onTap: {
      type: Object,
      value: {}
    },
    submitModule: {
      type: Object,
      value: {},
      observer: function(newVal, oldVal){
        this.triggerEvent('onSubmit', newVal)
        // this.data.onTap.action && this.data.onTap.action(newVal)
        this.data.submitModule = {}
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
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
    handleTap (e) {
      if (this.data.prop == 'submit') {
        if (!this.data.loading) {
          const nodes = this.getRelationNodes('../form/form')
          if (nodes.length > 0) {
            nodes[0].setData({
              curModule: {
                prop: 'submit',
                submitFlag: true
              }
            })
          }
          this.setData({
            loading: true
          })
        }
      } else {
        this.triggerEvent('onSubmit', e)
        // this.data.onTap.action && this.data.onTap.action(e)
      }
    }
  },

  ready: function () {
  }
})