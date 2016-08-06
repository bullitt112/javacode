package com.example.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;

@Entity
@Table(name = "User")
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
public class User implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
//	@Size(min=3, max=10, message="firstName must be between {min} and {max} characters")
	@Column(name = "firstName", length = 10, unique=true, nullable=false)
	private String firstName;
	
//	@Size(min=3, max=10, message="lastName must be between {min} and {max} characters")
	@Column(name = "lastName", length = 10, unique=true, nullable=false)
	private String lastName;
	
//	@Size(min=3, max=10, message="UID must be between {min} and {max} characters")
//	@Column(name = "uid", length = 10, unique=true, nullable=false)
//	private String uid;
	
//	@Email(message="Please provide a valid email address")
	@Column(name = "EmailAddress", length = 40, unique=true, nullable=false)
	private String EmailAddress;
	
//	@Email(message="Please provide a valid email address")
	@Column(name = "confirmEmailAddress", length = 40, unique=true, nullable=false)
	private String confirmEmailAddress;
	
//	@Size(min=3, max=10, message="password must be between {min} and {max} characters")
	@Column(name = "password", length = 10, unique=true, nullable=false)
	private String password;
	
//	@Size(min=3, max=10, message="password must be between {min} and {max} characters")
	@Column(name = "confirmPassword", length = 10, unique=true, nullable=false)
	private String confirmPassword;
	
	@Column(name = "securityQuestion", length = 80, columnDefinition="TEXT")
	private String securityQuestion = null;
	
//	@Size(min=3, max=25, message="security answer must be between {min} and {max} characters")
	@Column(name = "securityAnswer", length = 25, unique=true, nullable=false)
	private String securityAnswer;
	
//	@Column(name = "securityUUID", length = 80, columnDefinition="TEXT")
//	private String securityUUID = null;
//	
//	@Column(name = "registrationConfirmed", length = 10, columnDefinition="TEXT")
//	private String registrationConfirmed;
//	
	//	GetterType and Setters
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getEmailAddress() {
		return EmailAddress;
	}
	public void setEmailAddress(String EmailAddress) {
		this.EmailAddress = EmailAddress;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}	
	public String getSecurityAnswer() {
		return securityAnswer;
	}
	public void setSecurityAnswer(String securityAnswer) {
		this.securityAnswer = securityAnswer;
	}
	public String getSecurityQuestion() {
		return securityQuestion;
	}
	public void setSecurityQuestion(String securityQuestion) {
		this.securityQuestion = securityQuestion;
	}
	public String getConfirmPassword() {
		return confirmPassword;
	}
	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	public String getConfirmEmailAddress() {
		return confirmEmailAddress;
	}
	public void setConfirmEmailAddress(String confirmEmailAddress) {
		this.confirmEmailAddress = confirmEmailAddress;
	}
//	public String getSecurityUUID() {
//		return securityUUID;
//	}
	@Override
	public String toString() {
		return "User [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", EmailAddress=" + EmailAddress + ", confirmEmailAddress="
				+ confirmEmailAddress + ", password=" + password + ", confirmPassword=" + confirmPassword + ", securityQuestion=" + securityQuestion
				+ ", securityAnswer=" + securityAnswer + "]";
	}

//	public void setRegistrationConfirmed(String registrationConfirmed) {
//		this.registrationConfirmed = registrationConfirmed;
//	}
//	public String getRegistrationConfirmed() {
//		return registrationConfirmed;
//	}
}


