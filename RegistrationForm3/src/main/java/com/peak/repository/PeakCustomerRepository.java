package com.peak.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.peak.domain.PeakCustomerInfo;

@Transactional
public interface PeakCustomerRepository extends JpaRepository<PeakCustomerInfo, Integer> {

	List<PeakCustomerInfo> findAll();
	PeakCustomerInfo findOne(Integer id);
	
//	User findByEmailAddress(String EmailAddress);
	
//	User findByUID(String uid);

}

