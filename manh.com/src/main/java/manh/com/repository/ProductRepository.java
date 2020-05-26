package manh.com.repository;

import org.springframework.data.domain.Pageable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import manh.com.entity.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
	List<ProductEntity> findAllByNameLike(String name, Pageable pageable);
}
