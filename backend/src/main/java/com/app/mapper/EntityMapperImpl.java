package com.app.mapper;


import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EntityMapperImpl<D, E> implements EntityMapper<D, E> {

    @Autowired
    private ModelMapper modelMapper;

    @Setter
    private  Class<D> dtoClass;
    @Setter
    private  Class<E> entityClass;

    @Override
    public D toDto(E entity) {
        return modelMapper.map(entity, dtoClass);
    }

    @Override
    public E toEntity(D dto) {
        return modelMapper.map(dto, entityClass);
    }
}