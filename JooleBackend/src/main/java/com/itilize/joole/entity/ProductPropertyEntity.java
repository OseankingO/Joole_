package com.itilize.joole.entity;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "product_property", schema = "joole", catalog = "")
public class ProductPropertyEntity {
    private int id;
    private String name;
    private Collection<ProductHasProductPropertyEntity> productHasProductPropertiesById;
    private PropertyTypeEntity propertyTypeByPropertyTypeId;
    private ProductLineEntity productLineByProductLineId;

    public ProductPropertyEntity() {
    }

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductPropertyEntity that = (ProductPropertyEntity) o;

        if (id != that.id) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "productPropertyByProductPropertyId")
    public Collection<ProductHasProductPropertyEntity> getProductHasProductPropertiesById() {
        return productHasProductPropertiesById;
    }

    public void setProductHasProductPropertiesById(Collection<ProductHasProductPropertyEntity> productHasProductPropertiesById) {
        this.productHasProductPropertiesById = productHasProductPropertiesById;
    }

    @ManyToOne
    @JoinColumn(name = "property_type_id", referencedColumnName = "id", nullable = false)
    public PropertyTypeEntity getPropertyTypeByPropertyTypeId() {
        return propertyTypeByPropertyTypeId;
    }

    public void setPropertyTypeByPropertyTypeId(PropertyTypeEntity propertyTypeByPropertyTypeId) {
        this.propertyTypeByPropertyTypeId = propertyTypeByPropertyTypeId;
    }

    @ManyToOne
    @JoinColumn(name = "product_line_id", referencedColumnName = "id", nullable = false)
    public ProductLineEntity getProductLineByProductLineId() {
        return productLineByProductLineId;
    }

    public void setProductLineByProductLineId(ProductLineEntity productLineByProductLineId) {
        this.productLineByProductLineId = productLineByProductLineId;
    }
}
