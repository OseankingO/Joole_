package com.itilize.joole.entity;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "product", schema = "joole", catalog = "")
public class ProductEntity {
    private int id;
    private String series;
    private String model;
    private Collection<DetialEntity> detialsById;
    private ProductLineEntity productLineByProductLineId;
    private BrandEntity brandByBrandId;
    private Collection<ProductHasProductPropertyEntity> productHasProductPropertiesById;

    public ProductEntity() {
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
    @Column(name = "series")
    public String getSeries() {
        return series;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    @Basic
    @Column(name = "model")
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductEntity that = (ProductEntity) o;

        if (id != that.id) return false;
        if (series != null ? !series.equals(that.series) : that.series != null) return false;
        if (model != null ? !model.equals(that.model) : that.model != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (series != null ? series.hashCode() : 0);
        result = 31 * result + (model != null ? model.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "productByProductId")
    public Collection<DetialEntity> getDetialsById() {
        return detialsById;
    }

    public void setDetialsById(Collection<DetialEntity> detialsById) {
        this.detialsById = detialsById;
    }

    @ManyToOne
    @JoinColumn(name = "product_line_id", referencedColumnName = "id", nullable = false)
    public ProductLineEntity getProductLineByProductLineId() {
        return productLineByProductLineId;
    }

    public void setProductLineByProductLineId(ProductLineEntity productLineByProductLineId) {
        this.productLineByProductLineId = productLineByProductLineId;
    }

    @ManyToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "id", nullable = false)
    public BrandEntity getBrandByBrandId() {
        return brandByBrandId;
    }

    public void setBrandByBrandId(BrandEntity brandByBrandId) {
        this.brandByBrandId = brandByBrandId;
    }

    @OneToMany(mappedBy = "productByProductId")
    public Collection<ProductHasProductPropertyEntity> getProductHasProductPropertiesById() {
        return productHasProductPropertiesById;
    }

    public void setProductHasProductPropertiesById(Collection<ProductHasProductPropertyEntity> productHasProductPropertiesById) {
        this.productHasProductPropertiesById = productHasProductPropertiesById;
    }
}
