Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: false
  },
  relations: {
    '../collapse': {
      type: 'parent'
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleTap: function (e) {
      let active = !this.data.active
      this.setData({
        active: active
      })
      const nodes = this.getRelationNodes('../collapse')
      if (nodes.length > 0) {
        nodes[0].setData({
          activeName: this.data.name
        })
      }
      this.triggerEvent('onChange', {
        event: e,
        active: active
      })
    }
  },

  ready: function () {
  }
})