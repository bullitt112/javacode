

package com.itt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.itt.domain.User;

@Transactional
public interface UserRepository extends JpaRepository<User, Integer>{

	List<User> findAll();
	User findOne(Integer id);
	
//	User findByEmailAddress(String EmailAddress);
	
//	User findByUID(String uid);

}
