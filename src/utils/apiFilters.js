import filters from './filters'
// import bundleConfig from './bundleConfig'
var app = getApp();

const config = {
  // 默认购买数量
  buyCountDefalut: 1,
  // 最大购买数量
  maxBuyCount: 5
}

const fnList = {
  getItemData (res, opt) {
    let itemData = {}
    let options = opt || {}
    let bundleConfig = opt.app.globalData.bundleConfig
    // 商品图片
    itemData.images = []
    res.itemImageList && res.itemImageList.forEach(img => {
      itemData.images.push({
        code: img.code,
        src: img.picUrl
      })
    })
    // 商品信息
    itemData.spuId = res.code
    itemData.code = res.code
    itemData.title = res.title
    itemData.subTitle = res.subTitle
    itemData.description = res.description ? res.description.split(',') : null
    if (res.saleStatus == 1 || res.saleStatus == 3) {
      itemData.saleStatus = 1
    }
    // 选中的sku价格
    itemData.salePrice = filters.formatePrice(res.salePrice)
    itemData.delPrice = res.listPrice > res.salePrice ? filters.formatePrice(res.listPrice) : null
    itemData.listPrice = res.listPrice
    // 购买数量
    itemData.buyCount = config.buyCountDefalut
    // 最大购买数量
    itemData.maxCount = config.maxBuyCount
    // sku总库存
    itemData.goodCount = 0

    // sku列表
    itemData.skuList = []
    // 最大销售价
    itemData.maxPrice = 0
    // 最小销售价
    itemData.minPrice = 0
    res.skuList && res.skuList.forEach(skuObj => {
      if (skuObj.status == 0) {
        if (skuObj.salePrice > itemData.maxPrice) {
          itemData.maxPrice = skuObj.salePrice
        }
        if (skuObj.salePrice < itemData.minPrice) {
          itemData.minPrice = skuObj.salePrice
        }
        let netqty = skuObj.netqty < 0 ? 0 : skuObj.netqty
        itemData.goodCount += netqty

        let skuGroup = []
        skuObj.attrSaleList.forEach(attr => {
          let obj = {}
          obj.propCode = attr.code
          let value = []
          attr.attributeValueList.forEach(val => {
            if (value.indexOf(val.code) == -1) {
              value.push(val.code)
            }
          })
          obj.propId = value.join('|')
          skuGroup.push(obj)
        })
        itemData.maxPrice = filters.formatePrice(itemData.maxPrice)
        itemData.minPrice = filters.formatePrice(itemData.minPrice)
      
        itemData.skuList.push({
          skuId: skuObj.code,
          omsCode: skuObj.extentionCode,
          listPrice: filters.formatePrice(skuObj.listPrice),
          salePrice: filters.formatePrice(skuObj.salePrice),
          properties: skuGroup,
          qty: netqty
        })
      }
    })
    
    // 销售属性列表
    itemData.salesProps = []
    res.attrSaleList && res.attrSaleList.forEach((attrGroup, attrGroupIndex) => {
      let values = []
      attrGroup.attributeValueList.forEach((attr, attrIndex) => {
        let imageList = null
        if (attr.itemAttributeValueImageList) {
          imageList = []
          attr.itemAttributeValueImageList.forEach(img => {
            imageList.push({
              code: img.code,
              src: img.picUrl
            })
          })
        }
        values.push({
          name: attr.attributeValueFrontName || null,
          propId: attr.code,
          pic: attr.attributeValuePicURL || null,
          isActive: false,
          isDisabled: false,
          rowIndex: attrGroupIndex,
          index: attrIndex,
          imageList: imageList
        })
      })
      itemData.salesProps.push({
        groupName: attrGroup.attributeFrontName,
        propCode: attrGroup.code,
        hasError: false,
        valueSelected: null,
        values: values
      })
    })

    // 分类列表
    itemData.categoryList = []
    res.categoryList && res.categoryList.forEach(el => {
      if (el.code) {
        itemData.categoryList.push({
          code: el.code,
          name: el.name
        })
      }
    })

    // 品牌列表
    itemData.brand = {
      name: res.brand.name,
      code: res.brand.code
    }

    // 开售时间
    itemData.onSaleTime = res.fixedListTime || null
    itemData.advanceSale = false
    itemData.quickSale = false
    itemData.superscript = []
    
    bundleConfig && res.attrList && res.attrList.forEach(attr => {
      switch (attr.code) {
        // 角标
        case bundleConfig.superscript:
          attr.attributeValueList.forEach(el => {
            el.attributeValueFrontName && itemData.superscript.push({
              name: el.attributeValueFrontName
            })
          })
          break;
        // 销售状态
        case bundleConfig.saleStatus.code:
          attr.attributeValueList.forEach(el => {
            switch (el.code) {
              case bundleConfig.saleStatus.buyNow:
                // 仅支持立即购买
                itemData.quickSale = true
                if (itemData.onSaleTime) {
                  itemData.advanceSale = true
                }
                break
              case bundleConfig.saleStatus.cartAndBuyNow:
                // 支持加入购物车和立即购买
                break
              case bundleConfig.saleStatus.notSale:
                // 不支持购买
                itemData.saleStatus = 0
                break
            }
          })
        break
      }
    })
    // console.log('itemDataSku:', itemData)
    return Object.assign(itemData, options)
  }
}
module.exports = fnList