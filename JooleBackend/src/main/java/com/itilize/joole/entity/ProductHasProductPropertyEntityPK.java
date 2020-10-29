package com.itilize.joole.entity;//package com.itilize.joole.entity;
//
//import javax.persistence.Column;
//import javax.persistence.Id;
//import java.io.Serializable;
//
//public class ProductHasProductPropertyEntityPK implements Serializable {
//    private int productId;
//    private int productPropertyId;
//
//    @Column(name = "product_id")
//    @Id
//    public int getProductId() {
//        return productId;
//    }
//
//    public void setProductId(int productId) {
//        this.productId = productId;
//    }
//
//    @Column(name = "product_property_id")
//    @Id
//    public int getProductPropertyId() {
//        return productPropertyId;
//    }
//
//    public void setProductPropertyId(int productPropertyId) {
//        this.productPropertyId = productPropertyId;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//
//        ProductHasProductPropertyEntityPK that = (ProductHasProductPropertyEntityPK) o;
//
//        if (productId != that.productId) return false;
//        if (productPropertyId != that.productPropertyId) return false;
//
//        return true;
//    }
//
//    @Override
//    public int hashCode() {
//        int result = productId;
//        result = 31 * result + productPropertyId;
//        return result;
//    }
//}
