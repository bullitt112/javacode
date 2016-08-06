package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.domain.User;

@Transactional
public interface UserRepository extends JpaRepository<User, Integer> {

	List<User> findAll();
	User findOne(Integer id);
	
    List<User> findByLastName(String lastName);
	
//	User findByEmailAddress(String EmailAddress);
	
//	User findByUID(String uid);

}

