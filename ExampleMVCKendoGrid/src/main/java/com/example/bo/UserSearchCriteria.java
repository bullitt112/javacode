package com.example.bo;

import org.hibernate.validator.constraints.NotBlank;

public class UserSearchCriteria {

//	@NotBlank(message="{validation.uidLogonSearchCriteria.uidLogon.empty}")
	@NotBlank(message="Last Name must not be empty.")
//	@Size(min=9, max=9, message="{validation.userSearchCriteria.uid.size}")
//	@Digits(integer=9, fraction=0, message="{validation.userSearchCriteria.uid.size}")
	private String uid;
	private String lastName;
	
	private Boolean flag;
	private String mode;
	
	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public Boolean getFlag() {
		return flag;
	}

	public void setFlag(Boolean flag) {
		this.flag = flag;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

//	@Override
//	public String toString() {
//		StringBuilder builder = new StringBuilder();
//		builder.append("UserSearchCriteria [");
//		if (uid != null)
//			builder.append("uid=").append(uid);
//		builder.append(", flag=");
//		builder.append(flag);
//		builder.append("]");
//		
//		return builder.toString();
//	}
	
	

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Override
	public String toString() {
		return "UserSearchCriteria [uid=" + uid + ", lastName=" + lastName + ", flag=" + flag + ", mode=" + mode + "]";
	}	
}
