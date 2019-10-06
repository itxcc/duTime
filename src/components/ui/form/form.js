Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 被验证的表单行（父子组件通信用）
    curModule: {
      type: Object,
      value: '',
      observer: function(newVal, oldVal){
        if (newVal.prop == 'submit') {
          this.validateAll()
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 子组件集合
    nodes: []
  },
  relations: {
    '../input/input': {
      type: 'child'
    },
    '../button/button': {
      type: 'child'
    },
    '../checkbox/checkbox': {
      type: 'child'
    },
    '../radiobox/radiobox': {
      type: 'child'
    },
    '../switch/switch': {
      type: 'child'
    },
    '../addressPicker/addressPicker': {
      type: 'child'
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 验证所有表单行方法
     * @name validateAll
     */
    validateAll () {
      let validatorRm = new Promise(resolve => {
        const self = this
        let valid = true
        let count = 0
        let nodes = this.data.nodes.filter(node => {
          return node.data.prop != 'submit' && node.data.required
        })
        nodes.forEach(node => {
          const error = node.validate()
          if (error) {
            valid = false
          }
          if (++count === nodes.length) {
            resolve(valid)
          }
        })
      })
      validatorRm.then(valid => {
        let submitObj = {
          loading: false
        }
        if (valid) {
          submitObj.submitModule = this.getSubmitValue()
        }
        this.data.nodes.forEach(node => {
          if (node.data.prop == 'submit') {
            node.setData(submitObj)
          }
        })
      })

    },
    /**
     * 获取所有子组件集合
     * @name getNodes
     */
    getNodes () {
      const relationsConfig = [
        '../input/input',
        '../button/button',
        '../checkbox/checkbox',
        '../radiobox/radiobox',
        '../switch/switch',
        '../addressPicker/addressPicker'
      ]
      let nodes = []
      relationsConfig.forEach(child => {
        let childNodes = this.getRelationNodes(child)
        if (childNodes.length > 0) {
          nodes = nodes.concat(childNodes)
        }
      })
      this.data.nodes = nodes
    },
    /**
     * 获取表单数据
     * @name getSubmitValue
     */
    getSubmitValue () {
      let data = {}
      let nodes = this.data.nodes.filter(node => {
        return node.data.prop != 'submit'
      })
      nodes.forEach(node => {
        data[node.data.prop] = node.data.hasError ? null : node.data.value
      })
      return data
    }
  },
  created: function () {
  },
  ready: function () {
    // 获取子组件
    this.getNodes()
  }
})