package manh.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import manh.com.entity.BillEntity;

public interface BillRepository extends JpaRepository<BillEntity, Long> {

}
