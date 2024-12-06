package com.app.Dto;

import com.app.enums.AccountStatus;
import com.app.enums.AccountType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountDto extends BaseDto {
    private UserDto user;
    @NotNull
    private String name;
    @PositiveOrZero
    private double balance;
    @NotNull
    private AccountType accountType;
    @NotNull
    private AccountStatus status;

}
