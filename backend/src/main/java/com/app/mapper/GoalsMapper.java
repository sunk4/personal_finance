package com.app.mapper;

import com.app.Dto.GoalsDto;
import com.app.entity.Goals;
import org.springframework.stereotype.Component;

@Component
public class GoalsMapper extends EntityMapperImpl<GoalsDto, Goals> {
    public GoalsMapper () {
        setDtoClass(GoalsDto.class);
        setEntityClass(Goals.class);
    }
}
