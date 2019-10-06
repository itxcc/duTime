Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    open: {
      type: Boolean,value: false,
      observer(cur, old) { cur && this._showToast(); }
    },
    title: { type: String, value: '' },
    icon: { type: String, value: '' },
    styles: { type: String, value: '' },
    duration: { type: Number, value: 1 }
  },
  data: { animation: 'display: none;', timer: null },
  ready() {},
  methods: {
    _showToast() {
      let animation = 'animation: toasting linear ' + this.data.duration + 's; animation-fill-mode:forwards;';
      this.setData({ animation });
      this.data.timer = setTimeout(_ => { this.setData({ animation: 'display: none;', open: false }); clearTimeout(this.data.timer); }, this.data.duration * 1000)
    },
  }
});