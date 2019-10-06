Component({
  /**
   * 组件的属性列表
   */
  properties: {
    accordion: {
      type: Boolean,
      value: true
    },
    activeName: {
      type: String,
      value: '',
      observer: function(newVal, oldVal){
        this.setRowState(newVal)
        this.triggerEvent('onChange', {
          name: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  relations: {
    './child/collapse-row': {
      type: 'child'
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setRowState (name) {
      const nodes = this.getRelationNodes('./child/collapse-row')
      if (name) {
        this.data.accordion && nodes.forEach(el => {
          if (el.data.name != name) {
            el.setData({
              active: false
            })
          }
        })
      } else {
        nodes.forEach(el => {
          if (el.data.name == this.data.activeName) {
            el.setData({
              active: true
            })
          }
        })
      }
    }
  },
  ready: function () {
    this.setRowState()
  }
})