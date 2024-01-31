package com.ae.makeupshop.model;

public enum UnitOfMeasure {
    MILILITRES("ml"),
    GRAMS("g");

    private final String unit;

    UnitOfMeasure(String unit) {
        this.unit = unit;
    }

    public String getUnit() {
        return unit;
    }
}
