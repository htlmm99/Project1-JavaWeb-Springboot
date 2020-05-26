package manh.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import manh.com.entity.CartEntity;

public interface CartRepository extends JpaRepository<CartEntity, Long> {
}
