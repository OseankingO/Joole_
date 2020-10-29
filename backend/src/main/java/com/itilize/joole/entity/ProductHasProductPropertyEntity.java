package com.itilize.joole.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "product_has_product_property", schema = "joole", catalog = "")
//@IdClass(ProductHasProductPropertyEntityPK.class)
public class ProductHasProductPropertyEntity implements Serializable {
    private String value;
    private String extraValue;
    private ProductEntity productByProductId;
    private ProductPropertyEntity productPropertyByProductPropertyId;

    public ProductHasProductPropertyEntity() {
    }

    @Basic
    @Column(name = "value")
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Basic
    @Column(name = "extra_value")
    public String getExtraValue() {
        return extraValue;
    }

    public void setExtraValue(String extraValue) {
        this.extraValue = extraValue;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductHasProductPropertyEntity that = (ProductHasProductPropertyEntity) o;

        if (value != null ? !value.equals(that.value) : that.value != null) return false;
        if (extraValue != null ? !extraValue.equals(that.extraValue) : that.extraValue != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (value != null ? value.hashCode() : 0);
        result = 31 * result + (extraValue != null ? extraValue.hashCode() : 0);
        return result;
    }

    @Id
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    public ProductEntity getProductByProductId() {
        return productByProductId;
    }

    public void setProductByProductId(ProductEntity productByProductId) {
        this.productByProductId = productByProductId;
    }

    @Id
    @ManyToOne
    @JoinColumn(name = "product_property_id", referencedColumnName = "id", nullable = false)
    public ProductPropertyEntity getProductPropertyByProductPropertyId() {
        return productPropertyByProductPropertyId;
    }

    public void setProductPropertyByProductPropertyId(ProductPropertyEntity productPropertyByProductPropertyId) {
        this.productPropertyByProductPropertyId = productPropertyByProductPropertyId;
    }
}
