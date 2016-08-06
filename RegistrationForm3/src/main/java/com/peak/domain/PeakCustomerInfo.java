package com.peak.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity()
@Table(name = "PeakCustomerInfo")
public class PeakCustomerInfo implements Serializable {

		private static final long serialVersionUID = 1L;
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private Integer id;
		private String owner;
		private String state;
		private String address;
		private String county;
		private String contactName;
		private String electricSupplier;
		private String electricyRate;
		private String electricityContractExpiration;
		private String naturalGasSupplier;
		private String naturalGasRate;
		private String naturalGasContractExpiration;
		
		//Getters and Setters
		public Integer getId() {
			return id;
		}
		public void setId(Integer id) {
			this.id = id;
		}
		public String getOwner() {
			return owner;
		}
		public void setOwner(String owner) {
			this.owner = owner;
		}
		public String getState() {
			return state;
		}
		public void setState(String state) {
			this.state = state;
		}
		public String getAddress() {
			return address;
		}
		public void setAddress(String address) {
			this.address = address;
		}
		public String getCounty() {
			return county;
		}
		public void setCounty(String county) {
			this.county = county;
		}
		public String getContactName() {
			return contactName;
		}
		public void setContactName(String contactName) {
			this.contactName = contactName;
		}
		public String getElectricSupplier() {
			return electricSupplier;
		}
		public void setElectricSupplier(String electricSupplier) {
			this.electricSupplier = electricSupplier;
		}
		public String getElectricyRate() {
			return electricyRate;
		}
		public void setElectricyRate(String electricyRate) {
			this.electricyRate = electricyRate;
		}
		public String getElectricityContractExpiration() {
			return electricityContractExpiration;
		}
		public void setElectricityContractExpiration(String electricityContractExpiration) {
			this.electricityContractExpiration = electricityContractExpiration;
		}
		public String getNaturalGasSupplier() {
			return naturalGasSupplier;
		}
		public void setNaturalGasSupplier(String naturalGasSupplier) {
			this.naturalGasSupplier = naturalGasSupplier;
		}
		public String getNaturalGasRate() {
			return naturalGasRate;
		}
		public void setNaturalGasRate(String naturalGasRate) {
			this.naturalGasRate = naturalGasRate;
		}
		public String getNaturaGasContractExpiration() {
			return naturalGasContractExpiration;
		}
		public void setNaturaGasContractExpiration(String naturalGasContractExpiration) {
			this.naturalGasContractExpiration = naturalGasContractExpiration;
		}
		
		@Override
		public String toString() {
			return "PeakCustomerInfo [id=" + id + ", owner=" + owner + ", state=" + state + ", address=" + address + ", county=" + county
					+ ", contactName=" + contactName + ", electricSupplier=" + electricSupplier + ", electricyRate=" + electricyRate
					+ ", electricityContractExpiration=" + electricityContractExpiration + ", naturalGasSupplier=" + naturalGasSupplier
					+ ", naturalGasRate=" + naturalGasRate + ", naturalGasContractExpiration=" + naturalGasContractExpiration + "]";
		}
}
