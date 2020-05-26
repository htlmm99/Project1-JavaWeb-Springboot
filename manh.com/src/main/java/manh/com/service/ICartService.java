package manh.com.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import manh.com.dto.CartDTO;

public interface ICartService {
	List<CartDTO> getAll();

	CartDTO getOneById(Long id);

	CartDTO addCart(CartDTO cartDTO);

	List<CartDTO> getAllByBillId(Long bill_id);

	List<CartDTO> findAll(Pageable pageable);

	CartDTO save(CartDTO cartDTO);
	CartDTO update(CartDTO dto);
	void delete(long id);

}
