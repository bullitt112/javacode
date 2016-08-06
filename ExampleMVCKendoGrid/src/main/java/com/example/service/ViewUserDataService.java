package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.domain.User;
import com.example.repository.UserRepository;

@Service("ViewUserDataService")
@Repository
public class ViewUserDataService {

	@Autowired
	private UserRepository userRepository;
	
	ViewUserDataService(){
		System.out.println("ViewUserDataService Constructor ...");
	}
	
	@Transactional
	public List<User> findAll() {
		return userRepository.findAll();
	}

	public void save(User user) {
//			if(checkUserNameExists(user.getUserName())){
//				throw new RuntimeException("UserName ["+user.getUserName()+"] already exist");
//			}
//			if(checkEmailExists(user.getEmailAddress())){
//				throw new RuntimeException("Email ["+user.getEmailAddress()+"] already exist");
//			}
			userRepository.save(user);
	}
	
//	public boolean checkEmailExists(String emailAddress)
//	{
//		return userRepository.findByEmail(emailAddress) != null;
//	}
	
	@Transactional
	public void delete(int id) {
		userRepository.delete(id);
		System.out.println("User Deleted = " + id);
	}
	
	@Transactional
	public User saveOrUpdate(User user) {
		return userRepository.save(user);
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

	public User findOne(int id) {
		return userRepository.findOne(id);
	}
}




//package com.example.service;
//
//import java.util.List;
//
//import com.example.domain.User;
//
//public interface ViewUserDataService {
//	public User getUserData(String uid);
//	public List<User> getAllUsers();
//}
