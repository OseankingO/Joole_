package com.itilize.joole.entity;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "brand", schema = "joole", catalog = "")
public class BrandEntity {
    private int id;
    private String name;
    private Collection<ProductEntity> productsById;

    public BrandEntity() {
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

        BrandEntity that = (BrandEntity) o;

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

    @OneToMany(mappedBy = "brandByBrandId")
    public Collection<ProductEntity> getProductsById() {
        return productsById;
    }

    public void setProductsById(Collection<ProductEntity> productsById) {
        this.productsById = productsById;
    }
}
