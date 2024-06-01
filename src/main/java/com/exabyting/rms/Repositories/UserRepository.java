package com.exabyting.rms.Repositories;

import com.exabyting.rms.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
}
