package com.peak.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.peak.domain.PeakCustomerInfo;
import com.peak.repository.PeakCustomerRepository;

@Service("PeakService")
@Repository
public class PeakService {

	@Autowired
	private PeakCustomerRepository peakCustomerRepository;
	
	PeakService(){
		System.out.println("PeakService Constructor ...");
	}
	
	@Transactional
	public List<PeakCustomerInfo> findAll() {
		return peakCustomerRepository.findAll();
	}

	public void save(PeakCustomerInfo peakCustomerInfo) {
//			if(checkUserNameExists(user.getUserName())){
//				throw new RuntimeException("UserName ["+user.getUserName()+"] already exist");
//			}
//			if(checkEmailExists(user.getEmailAddress())){
//				throw new RuntimeException("Email ["+user.getEmailAddress()+"] already exist");
//			}
		peakCustomerRepository.save(peakCustomerInfo);
	}
	
//	public boolean checkEmailExists(String emailAddress)
//	{
//		return userRepository.findByEmail(emailAddress) != null;
//	}
	
	@Transactional
	public void delete(int id) {
		peakCustomerRepository.delete(id);
		System.out.println("User Deleted = " + id);
	}
	
	@Transactional
	public PeakCustomerInfo saveOrUpdate(PeakCustomerInfo peakCustomerInfo) {
		return peakCustomerRepository.save(peakCustomerInfo);
	}
	
//	public User findByEmailAddress(String emailAddress){
//		return userRepository.findByEmailAddress(emailAddress);
//	}

//	public User findByUID(String uid) {
//		return userRepository.findByUID(uid);
//	}
	
//	public User findOne(String uid) {
//		return userRepository.findOne(uid);
//	}

	public PeakCustomerInfo findOne(int id) {
		return peakCustomerRepository.findOne(id);
	}
//	public User findOne(String username) {
//		return userRepository.findByName(username);
//	}
}

