package com.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@Entity
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "category", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "name"})
})
public class Category extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private String name;
    private String type;
    private String color;
    @OneToMany(mappedBy = "category")
    private List<RecurringTransaction> recurringTransactions;

}
