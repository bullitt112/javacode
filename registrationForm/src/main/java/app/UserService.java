


package app;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itt.domain.User;
import com.itt.repository.UserRepository;

@Service("UserService")
@Repository
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	UserService(){
		System.out.println("UserServiceImpl Constructor ...");
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
	
	public void delete(int id) {
		userRepository.delete(id);
		System.out.println("User Deleted = " + id);
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
//	public User findOne(String username) {
//		return userRepository.findByName(username);
//	}
}
