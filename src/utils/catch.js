module.exports = {
  store: {
    formIdList: []
  },
  saveFormId (formId) {
    if (formId != 'the formId is a mock one') {
      this.store.formIdList.push({ formId, time: new Date().getTime()})
    }
  },
  clearFormId () {
    this.store.formIdList = []
  },
  initFormId () {}
}