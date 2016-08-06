

package com.itt.validator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.itt.domain.User;

public class RegistrationValidator implements Validator {

@Override
public boolean supports(Class<?> arg0) {
return true;
}

@Override
public void validate(Object object, Errors errors) {
  User user = (User)object;
  ValidationUtils.rejectIfEmpty(errors, "firstName", "error.firstName", "FirstName is a required field");
          ValidationUtils.rejectIfEmpty(errors, "lastName", "required.lastName", "LastName is a required field");
          ValidationUtils.rejectIfEmptyOrWhitespace(errors, "emailAddress", "required.emailAddress", "eMailAddress is a required field");
          ValidationUtils.rejectIfEmptyOrWhitespace(errors, "confirmEmailAddress", "required.emailAddress", "Confirm eMailAddress is a required field");
          ValidationUtils.rejectIfEmpty(errors, "password", "required.password", "Password is a required field");
          ValidationUtils.rejectIfEmpty(errors, "confirmPassword", "required.confirmPassword", "Confirm Password is a required field");
          if (!isValidEmailAddress(user.getEmailAddress())) {
          errors.rejectValue("emailAddress", "error.emailAddress", "Email address has invalid characters");
          }
          if (!isValidEmailAddress(user.getEmailAddress())) {
            errors.rejectValue("confirmEmailAddress", "error.confirmEmailAddress", "Confirm Email address has invalid characters");
          }
          if (!(user.getEmailAddress().equals(user.getConfirmEmailAddress()))) {
              errors.rejectValue("emailAddress","error.cofirmemailmismatch","Email and Confirm Emai Not match.");
          }
//          ValidationUtils.rejectIfEmpty(errors,"password","required.password");
//          ValidationUtils.rejectIfEmpty(errors,"confirmPassword","required.confirmPassword");
          if (!(user.getPassword().equals(user.getConfirmPassword()))) {
                errors.rejectValue("password","error.cofirmpasswordmismatch","Password and Confirm Password Not match.");
              }
          
//          Pattern pattern = Pattern.compile("\\d{3}-\\d{10}");
//          Matcher matcher = pattern.matcher(user.getPhoneNumber());
//          
//          ValidationUtils.rejectIfEmpty(errors,"phoneNumber","error.phoneNo");
//          if(!matcher.matches()){
//          errors.rejectValue("phoneNumber", "error.phoneNo.invalid");
//          }
         ValidationUtils.rejectIfEmpty(errors,"securityAnswer","error.securityanswer", "Security Answer is a required field");
}
public boolean isValidEmailAddress(String emailAddress) {
// String
// expression="^[\\w\\-]([\\.\\w])+[\\w]+@([\\w\\-]+\\.)+[A-Z]{2,4}$";
String expression = "[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}";
// String
// expression="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
// String
// expression="/^((([a-z]|\d|[!#$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i";
CharSequence inputStr = emailAddress;
Pattern pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE);
Matcher matcher = pattern.matcher(inputStr);
return matcher.matches();
}
}
