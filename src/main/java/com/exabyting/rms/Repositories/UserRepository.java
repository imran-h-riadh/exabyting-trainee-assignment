package com.exabyting.rms.Repositories;

import com.exabyting.rms.Entities.Helper.Role;
import com.exabyting.rms.Entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    Page<User> findByRolesContaining(Role role, Pageable pageable);

    User findByEmail(String email);
}
