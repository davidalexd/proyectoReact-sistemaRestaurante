package com.restaurant.api.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class PasswordReset {
    @NotBlank
    private String oldPassword;

    @NotBlank
    private String newPassword;

    @NotBlank
    private String passwordConfirmation;

    public boolean validateNewPassword(){
        return newPassword.equals(passwordConfirmation);
    }

}
